import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchKitbagKit } from '../../../actions/KitbagKitActions';
import KitForm from './KitForm';
import Title from '../../includes/Title';

const KitEditPage = () => {

  console.log(this.props.match.params.id);

  //const dispatch = useDispatch();

  //const kitState = useState( () => dispatch(fetchKitbagKit('ahjsdhjk')));

  // componentDidMount() {
  //   this.props.actions.fetchKitbagKit(this.props.match.params.id);
  // }

  return (
    <div>
      <Title title="Edit kit" />
      <section id="main" className="container-fluid" aria-label="main body of content plus related links and features">
        <div className="container">
          <KitForm />
        </div>
      </section>
    </div>
  );

}

// const mapStateToProps = (state, ownProps) => {
//   let newKit = state.kitbag.kits[ownProps.match.params.id];
//   if (state.kitbag.kits[ownProps.match.params.id])  {
//     newKit = {
//       ...(state.kitbag.kits[ownProps.match.params.id]),
//       purchases: (state.kitbag.kits[ownProps.match.params.id]).purchases.map(p => {
//         const purchase = {...p};
//         purchase.ondate = p.ondate.toString().substring(0,10);
//         return purchase;
//       })
//     };
//   }
//   return { kit: newKit };
// };

export default KitEditPage;
