import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

const Detail = () => {
  const { id } = useParams();
  const [detailData, setDetailData] = useState({});

  useEffect(() => {
    const getMovie = async () => {
      try {
        const docRef = doc(db, "movies", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setDetailData(docSnap.data());
        } else {
          console.log("No such document in Firebase 🔥");
        }
      } catch (error) {
        console.log("Error getting document:", error);
      }
    };

    getMovie();
  }, [id]);

  return (
    <Container>
      <Background>
        <img
          alt={detailData.title || "Background"}
          src={detailData.backgroundImg}
        />
        <Gradient />
      </Background>
      <ContentContainer>
        <ImageTitle>
          <img
            alt={detailData.title || "Title"}
            src={detailData.titleImg || "/images/placeholder-title.png"}
          />
        </ImageTitle>
        <ContentMeta>
          <h1>{detailData.title}</h1>
          <Controls>
            <Player>
              <img src="/images/play-icon-black.png" alt="play" />
              <span>Play</span>
            </Player>
            <Trailer>
              <img src="/images/play-icon-white.png" alt="trailer" />
              <span>Trailer</span>
            </Trailer>
            <AddList>
              <span />
              <span />
            </AddList>
            <GroupWatch>
              <div>
                <img src="/images/group-icon.png" alt="group watch" />
              </div>
            </GroupWatch>
          </Controls>
          <SubTitle>{detailData.subTitle}</SubTitle>
          <Description>{detailData.description}</Description>
        </ContentMeta>
      </ContentContainer>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  height: 100vh;
  overflow: hidden;
  padding: 0 calc(3.5vw + 5px);
`;

const Background = styled.div`
  left: 0px;
  opacity: 0.8;
  position: absolute;
  right: 0px;
  top: 0px;
  bottom: 0px;
  z-index: -1;

  img {
    width: 100%;
    height: 100vh;
    object-fit: cover;
    object-position: center;
  }
`;

const Gradient = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.5) 0%,
    rgba(0, 0, 0, 0.8) 60%,
    rgba(0, 0, 0, 0.9) 100%
  );
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding-top: 72px; /* Adjusted to account for navbar */
  position: relative;
`;

const ImageTitle = styled.div`
  align-self: flex-start;
  position: absolute;
  top: 100px;
  left: 0;
  z-index: 2;

  img {
    max-width: 300px;
    min-width: 120px;
    width: 20vw;
    filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.3));
    border-radius: 15px;
    transform: perspective(1000px) rotateY(-5deg);
    transition: transform 0.5s ease;
    
    &:hover {
      transform: perspective(1000px) rotateY(0deg);
    }
  }

  @media (max-width: 768px) {
    top: 80px;
    
    img {
      max-width: 200px;
      width: 25vw;
    }
  }
`;

const ContentMeta = styled.div`
  max-width: 700px;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 30px 40px;
  margin-top: auto;
  margin-bottom: 80px;
  margin-left: auto;
  background: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  color: white;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.7);
  border: 1px solid rgba(249, 249, 249, 0.1);
  align-self: flex-end;

  h1 {
    font-size: 44px;
    margin-bottom: 12px;
    font-weight: 600;
    background: linear-gradient(to right, #fff, #ccc);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  @media (max-width: 768px) {
    margin-top: 150px;
    padding: 20px;
    margin-left: 0;
    max-width: 100%;

    h1 {
      font-size: 32px;
    }
  }
`;

const Controls = styled.div`
  display: flex;
  align-items: center;
  flex-flow: row nowrap;
  margin: 20px 0;
  min-height: 56px;
`;

const Player = styled.button`
  font-size: 15px;
  margin: 0 22px 0 0;
  padding: 0 24px;
  height: 56px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  letter-spacing: 1.8px;
  text-align: center;
  text-transform: uppercase;
  background: rgb(249, 249, 249);
  border: none;
  color: rgb(0, 0, 0);
  cursor: pointer;
  transition: all 0.2s ease;
  font-weight: bold;

  img {
    width: 24px;
    margin-right: 8px;
  }

  &:hover {
    background: rgb(229, 229, 229);
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 768px) {
    height: 45px;
    padding: 0 12px;
    font-size: 12px;
    margin: 0 10px 0 0;

    img {
      width: 20px;
    }
  }
`;

const Trailer = styled(Player)`
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgb(249, 249, 249);
  color: rgb(249, 249, 249);

  &:hover {
    background: rgba(23, 23, 23, 0.6);
    border-color: rgba(249, 249, 249, 0.8);
  }
`;

const AddList = styled.div`
  margin-right: 16px;
  height: 44px;
  width: 44px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 50%;
  border: 2px solid white;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.1) rotate(180deg);
    background-color: rgba(249, 249, 249, 0.1);
  }

  span {
    background-color: rgb(249, 249, 249);
    display: inline-block;

    &:first-child {
      height: 2px;
      transform: translate(1px, 0px) rotate(0deg);
      width: 16px;
    }

    &:nth-child(2) {
      height: 16px;
      transform: translateX(-8px) rotate(0deg);
      width: 2px;
    }
  }
`;

const GroupWatch = styled.div`
  height: 44px;
  width: 44px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.1) rotate(360deg);
  }

  div {
    height: 40px;
    width: 40px;
    background: rgb(0, 0, 0);
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 2px solid white;

    img {
      width: 24px;
    }
  }
`;

const SubTitle = styled.div`
  color: rgb(249, 249, 249);
  font-size: 15px;
  min-height: 20px;
  margin-top: 26px;
  letter-spacing: 0.5px;
`;

const Description = styled.div`
  line-height: 1.6;
  font-size: 18px;
  margin-top: 16px;
  color: rgba(249, 249, 249, 0.8);
  max-width: 760px;
`;
export default Detail;