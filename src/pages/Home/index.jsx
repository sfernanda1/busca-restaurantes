import React, {useState} from 'react';
import logo from '../../assets/logo.svg';
import Slider from "react-slick";
import TextField, { Input } from '@material/react-text-field';
import MaterialIcon from '@material/react-material-icon';
import { useSelector } from 'react-redux';

import { Card, RestaurantCard, Modal, Map, Loader,  Skeleton } from '../../components';
import restaurante from '../../assets/restaurante-fake.png'

import {Container, Logo, Search, Wrapper, CarouselTitle, Carousel, ModalTitle, ModalContent} from './styled';



const Home = () => {
    const [inputValue, setInputValue] = useState('Pesquisar Restaurante');
    const [modalOpened, setModalOpened] = useState (false);
    const [query, setQuery] = useState(null);
    const [placeId, setPlaceId] = useState(null);
    const{restaurants, restaurantSelected} = useSelector((state) => state.restaurants);

    const settings = {
        dots: false,
        infinite: true,
        autoplay: true ,
        speed: 300,
        slidesToShow: 4,
        slidesToScroll: 4,
        adaptiveHeight: true,
    };

    function handleKeyPress(e){
        if (e.key === 'Enter') {
            setQuery(inputValue);
        }
    };

    function handleOpenModal(placeId){
        setPlaceId(placeId);
        setModalOpened(true);
    }

    

    return (
    <Wrapper>
        <Container>
            <Search>
                <Logo src={logo} alt ='Logo do restaurante' />
                  <TextField
                    label= "Pesquisar restaurante"
                    outlined
                    //onTrailingIconSelect={() => this.setState({value: ''})}
                    trailingIcon={<MaterialIcon role="button" icon="search"/>}
            
                    ><Input
                      value={inputValue}
                      onKeyPress={handleKeyPress}
                      onChange={(e) => setInputValue(e.target.value)}/>
                  </TextField>
                  {restaurants.length>0? (
                  <>
                  <CarouselTitle>Na sua área</CarouselTitle>
                  <Carousel {...settings}>
                    {restaurants.map((restaurant) =>(
                      <Card
                        key={restaurant.place_id}
                        photo ={restaurant.photos ? restaurant.photos[0].getUrl() : restaurante } 
                        title={restaurant.name} />
                    ))}
                  </Carousel>
                  </>
                  ):(
                  <Loader />
                )}
            </Search>
  
            {restaurants.map ((restaurant) =>
              <RestaurantCard 
                onClick={() => handleOpenModal(restaurant.place_id)} 
                restaurant={restaurant}
                />
               )}
          </Container>
            <Map query={query} placeId={placeId}/>
            <Modal open={modalOpened} onClose={() => setModalOpened(!modalOpened)}>
            {restaurantSelected ? (
            <>
              <ModalTitle>{restaurantSelected?.name}</ModalTitle>
              <ModalContent size="medium">{restaurantSelected?.formatted_phone_number}</ModalContent>
              <ModalContent size="medium">{restaurantSelected?.formatted_address}</ModalContent>
              <ModalContent>
                {restaurantSelected?.opening_hours?.open_now
                  ? 'Aberto agora :) '
                  : 'Fechado neste momento :('}
              </ModalContent>
            </>
          ) : (
            <>
              <Skeleton width="10px" height="10px" />
              <Skeleton width="10px" height="10px" />
              <Skeleton width="10px" height="10px" />
              <Skeleton width="10px" height="10px" />
            </>
          )}
        </Modal>
    </Wrapper>
       
    );
};

export default Home;