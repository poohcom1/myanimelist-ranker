// import React from "react";
// import styled from "styled-components";
// import withPromiseLoading from "../../hoc/PromiseLoader";
// import { getCompletedAnimeList } from "../../libs/mal";
// import { ListManager } from "react-beautiful-dnd-grid";

// const MainDiv = styled.div`
//   padding: 15px;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
// `;

// const Grid = styled.div`
//   display: flex;
//   flex-direction: column;

//   .row {
//     display: flex;
//   }

//   .box {
//     width: 10vw;
//     height: 10vw;
//     border: 1px black solid;
//     padding: 0;
//     overflow: hidden;
//   }

//   img {
//     margin: 0;
//     width: 10vw;
//     height: 10vw;
//     object-fit: cover;
//   }
// `;

// const PureThreeByThree = withPromiseLoading(
//   class extends React.Component {
//     constructor(props) {
//       super(props);

//       this.state = {
//         grid: this.props.promiseData.slice(0, 9),
//         list: this.props.promiseData.slice(9, this.props.promiseData.length),
//       };
//     }

//     render() {
//       return (
//         <MainDiv>
//           <ListManager
//             items={this.state.grid}
//             direction="horizontal"
//             maxItems={3}
//             render={(anime) => (
//               <img src={anime.image_url} alt={anime.title} width="120px" />
//             )}
//             onDragEnd={() => {}}
//           />
//         </MainDiv>
//       );
//     }
//   }
// );

// export default function ThreeByThree(props) {
//   return (
//     <>
//       <PureThreeByThree
//         promise={getCompletedAnimeList(props.user)}
//         deps={[props.user]}
//         errMessage={"User not found"}
//       />
//     </>
//   );
// }
