import { FieldDate } from './FieldDate';

export default { title: 'Forms/Date field', component: FieldDate };

export const Example = () => (
  <FieldDate onChange={console.log} name="dob" label="Date of birth"></FieldDate>
);

Example.story = {
  parameters: {
    info: 'Uses react-calendar (https://github.com/wojtekmaj/react-calendar#readme) to create a accessible date field',
  },
};
