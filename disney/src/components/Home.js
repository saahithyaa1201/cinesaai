// import styled from "styled-components";
// import ImgSlider from "./ImgSlider";
// import NewDisney from "./NewDisney";
// import Originals from "./Originals";
// import Recommends from "./Recommends";
// import Trending from "./Trending";
// import Viewers from "./Viewers";
// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { collection, onSnapshot } from "firebase/firestore";
// import { db } from "../firebase";
// import { setMovies } from "../features/movie/movieSlice";
// import { selectUserName } from "../features/user/userSlice";
// import Header from "./Header";
// const Home = () => {
//   const dispatch = useDispatch();
//   const userName = useSelector(selectUserName);

//   useEffect(() => {
//     const moviesCollection = collection(db, "movies");
//     const unsubscribe = onSnapshot(moviesCollection, (snapshot) => {
//       let recommendsArray = [];
//       let newDisneysArray = [];
//       let originalsArray = [];
//       let trendingArray = [];

//       snapshot.docs.forEach((doc) => {
//         const data = { id: doc.id, ...doc.data() };
//         switch (data.type) {
//           case "recommend":
//             recommendsArray.push(data);
//             break;
//           case "new":
//             newDisneysArray.push(data);
//             break;
//           case "original":
//             originalsArray.push(data);
//             break;
//           case "trending":
//             trendingArray.push(data);
//             break;
//           default:
//             break;
//         }
//       });

//       dispatch(
//         setMovies({
//           recommend: recommendsArray,
//           newDisney: newDisneysArray,
//           original: originalsArray,
//           trending: trendingArray,
//         })
//       );
//     });

//     return () => unsubscribe();
//   }, [userName, dispatch]);

//   return (
//     <Container>
//       <ImgSlider />
//       <Viewers />
//       <Recommends />
//       <NewDisney />
//       <Originals />
//       <Trending />
//     </Container>
//   );
// };

// const Container = styled.main`
//   position: relative;
//   min-height: calc(100vh - 250px);
//   overflow-x: hidden;
//   display: block;
//   top: 72px;
//   padding: 0 calc(3.5vw + 5px);

//   &:after {
//     background: url("/images/home-background.png") center center / cover
//       no-repeat fixed;
//     content: "";
//     position: absolute;
//     inset: 0px;
//     opacity: 1;
//     z-index: -1;
//   }
// `;

// export default Home;

import styled from "styled-components";
import ImgSlider from "./ImgSlider";
import NewDisney from "./NewDisney";
import Originals from "./Originals";
import Recommends from "./Recommends";
import Trending from "./Trending";
import Viewers from "./Viewers";
import Header from "./Header";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { setMovies } from "../features/movie/movieSlice";
import { selectUserName } from "../features/user/userSlice";

const Home = () => {
  const dispatch = useDispatch();
  const userName = useSelector(selectUserName);

  useEffect(() => {
    const moviesCollection = collection(db, "movies");
    const unsubscribe = onSnapshot(moviesCollection, (snapshot) => {
      let recommendsArray = [];
      let newDisneysArray = [];
      let originalsArray = [];
      let trendingArray = [];

      snapshot.docs.forEach((doc) => {
        const data = { id: doc.id, ...doc.data() };
        switch (data.type) {
          case "recommend":
            recommendsArray.push(data);
            break;
          case "new":
            newDisneysArray.push(data);
            break;
          case "original":
            originalsArray.push(data);
            break;
          case "trending":
            trendingArray.push(data);
            break;
          default:
            break;
        }
      });

      dispatch(
        setMovies({
          recommend: recommendsArray,
          newDisney: newDisneysArray,
          original: originalsArray,
          trending: trendingArray,
        })
      );
    }, (error) => {
      console.error("Firestore error:", error);
    });

    return () => unsubscribe();
  }, [dispatch]);

  return (
    <>
      <Header />
      <Container>
        <ImgSlider />
        <Viewers />
        <Recommends />
        <NewDisney />
        <Originals />
        <Trending />
      </Container>
    </>
  );
};

const Container = styled.main`
  position: relative;
  min-height: calc(100vh - 70px);
  overflow-x: hidden;
  display: block;
  top: 70px;
  padding: 0 calc(3.5vw + 5px);
  z-index: 0;

  &:after {
    background: url("/images/home-background.png") center center / cover no-repeat fixed;
    content: "";
    position: absolute;
    inset: 0px;
    opacity: 1;
    z-index: -1;
  }
`;

export default Home;