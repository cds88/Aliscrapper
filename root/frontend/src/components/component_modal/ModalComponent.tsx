


import * as React from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick'; 

import { ThunkDispatch } from "redux-thunk";
import { connect } from 'react-redux';

 
import {useRef, useEffect}  from 'react';
import '../../styles/ModalStyles.scss';
import { CSSTransition } from 'react-transition-group';
import { AllAppActions } from '../../reducers/actions/AllActionsTypes';
import { bindActionCreators } from 'redux';
import { CloseModal } from '../../reducers/actions/AllActions';
import { AppState } from '../../reducers/ConfigureStore';

export interface ModalProps{
    isModalOpened?: boolean;
 
}

interface LinkStateToProps{
    modalImages: string[];
}

const mapStateToProps =(
    state: AppState,
    ownProps: ModalProps
)=>({
    modalImages: state.InterfaceReducer.modalImages
})
interface LinkDispatchToProps{
    closeModal :()=>void;
}

const mapDispatchToProps=(
    dispatch: ThunkDispatch<any,any,AllAppActions>,
    ownProps: ModalProps
):LinkDispatchToProps=>({
    closeModal: bindActionCreators(CloseModal, dispatch)
})





type Props = ModalProps & LinkDispatchToProps & LinkStateToProps;
 const ModalComponent=(Props:Props)=> {
     const modalWrapper = useRef(null);
     let imageGallery:any = null;
  
    const closeModal=(ref:any)=>{
        function closePopup(event:any){
            if(ref.current && !ref.current.contains(event.target)){
                Props.closeModal();
            }
        }
        useEffect(()=>{
            document.addEventListener('mousedown', closePopup)
        })
    }
     const galleryPrev = () => {
         imageGallery.slickPrev();
     }
     const galleryNext = () => {
         imageGallery.slickNext();
     }
    closeModal(modalWrapper);
    if(Props.isModalOpened){
    var imagesGallery = Props.modalImages.map(
        (image, index)=>{
            return(
                <div className="page-scroll" key={index}>
                    <img src={image} alt=""/>
                </div>
            )
        }
    )
    }
    return (

        <CSSTransition
      
            in={Props.isModalOpened}
          
            timeout={300}
            classNames="modalTransition"
            unmountOnExit>

        <div className="modal-gallery" ref={modalWrapper}>
                 <Slider
                    speed={500}
                    slidesToShow={1}
                    slidesToScroll={1}
                    infinite={true}
                    dots={true}
                    arrows={false}
                    ref={slider => imageGallery = slider}

                >
                    {imagesGallery}

                </Slider> 
                <button onClick={galleryPrev} className="btn btn-secondary gallery-control">Back</button>
                <button onClick={galleryNext} className="btn btn-secondary gallery-control" >Next</button>
            
             </div>
        </CSSTransition>


      
          

 
    )  
    
    
 
}
  
 
export default connect(mapStateToProps, mapDispatchToProps)( ModalComponent);