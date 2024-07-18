import styles from './trapezoid.module.scss'
import {BlueTrapezoid} from '../icon-components/blue-trapezoid';
import {YellowTrapezoid} from '../icon-components/yellow-trapezoid';
import {RedTrapezoid} from '../icon-components/red-trapezoid';
import {TurquoiseTrapezoid} from '../icon-components/turquoise-trapezoid';

export const Trapezoid = () => {
  return (
    <>
      <div className={styles.wrapper}>
        <div>
          <TurquoiseTrapezoid />
          {/*//TODO add number*/}
          <span></span>
          <span>Number of applications</span>
        </div>
        <div>
          <RedTrapezoid />
          <span></span>
          <span>Completed test tasks</span>
        </div>
        <div>
          <YellowTrapezoid />
          <span></span>
          <span>Invited for an interview</span>
        </div>
        <div>
          <BlueTrapezoid />
          <span></span>
          <span>Joined to the team</span>
        </div>
      </div>
    </>
  );
};
