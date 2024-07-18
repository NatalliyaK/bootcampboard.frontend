import {InputData} from '../functions/utils/utils';
import {useState, useRef, ChangeEvent} from 'react';
import {getNewInputData} from '../functions/utils/utils';
import {Input} from '../components/input';
import {PasswordInput} from '../components/password-input';

export function useInputs(
  inputs: InputData[],
  onChangeInputAdditionally?: () => void,
) {
  const [inputData, setInputData] = useState<InputData[]>(inputs);
  const refsArr = useRef<HTMLInputElement[]>([]);

  const changeInputHandler = (
    e: ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    setInputData((prev) => {
      return getNewInputData(prev, index, {
        value: e.target.value,
        errorMessage: '',
      });
    });

    if (onChangeInputAdditionally) {
      onChangeInputAdditionally();
    }
  };

  const validate = () => {
    const newArr = inputData.map((data) => {
      const error = data.validationFn(data.value);
      return error ? {...data, errorMessage: error, isAfterError: true} : data;
    });
    const indexOfFocus = newArr.findIndex((data) => data.errorMessage);

    if (indexOfFocus >= 0) {
      setInputData(newArr);
      refsArr.current[indexOfFocus].focus();
      return 'Validation error';
    }
  };

  const inputsLayout = inputData.map((el, index) => {
    if (el.type === 'password') {
      return (
        <PasswordInput
          key={index}
          ref={(el: HTMLInputElement) => (refsArr.current[index] = el)}
          name={el.name}
          value={el.value}
          maxLength={el.maxLength}
          errorMessage={el.errorMessage}
          onChange={(e) => changeInputHandler(e, index)}
        />
      );
    }
    return (
      <Input
        key={index}
        ref={(el: HTMLInputElement) => (refsArr.current[index] = el)}
        name={el.name}
        label={el.label}
        value={el.value}
        type={el.type ? el.type : 'text'}
        maxLength={el.maxLength}
        placeholder={el.placeholder}
        autofocus={index === 0}
        errorMessage={el.errorMessage}
        onChange={(e) => changeInputHandler(e, index)}
        hint={el.hint}
        isAfterError={el.isAfterError}
      />
    );
  });

  return {
    inputData,
    setInputData,
    validate,
    inputsLayout,
    refs: refsArr.current,
  };
}
