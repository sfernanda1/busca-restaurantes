import React, {useEffect, useState} from "react";
import styled from "styled-components";
import { Skeleton } from "..";
import theme from "../../theme";

export const Card = styled.div`
  min-width: 90px;
  height: 90px;
  border-radius: 8px;
  background-image: url(${(props) => props.photo});
  background-size: cover;
  p {
    margin-left: 6px;
    margin-top: 10px;
  }
`;

const Title =styled.span`
    font-family: ${(props) => theme.fonts.regular};
    color: #ffffff;
    font-size:16px;

`;

const ImageCard = ({photo, title}) => {
  const [imageLoaded, setImageLoaded] = useState(false)
  useEffect (() =>{
    const imageLoader = new Image();
    imageLoader.src = photo;
    imageLoader.onload =() => setImageLoaded(true);
  },[photo]);

   return(
     <>
     {imageLoaded ? (
    <Card photo = {photo}>
    <Title>{title}</Title>
    </Card>  
     ):(
       <Skeleton width = "90px" heitht ="90px" />
       )}
    </>
    );
   };
   
export default ImageCard;