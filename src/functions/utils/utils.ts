export type InputData = {
  name: string;
  label: string;
  value: string;
  maxLength: number;
  placeholder: string;
  errorMessage: string;
  hint: string;
  validationFn: (value: string) => string;
  isAfterError: boolean;
  type?: 'text' | 'number' | 'email' | 'password';
};

export const getNewInputData = (
  inputData: InputData[],
  inputIndex: number,
  newProperties: {errorMessage: string; value?: string; isAfterError?: boolean},
) => {
  const newArr = [...inputData];
  newArr[inputIndex] = {
    ...newArr[inputIndex],
    ...newProperties,
  };

  return newArr;
};
