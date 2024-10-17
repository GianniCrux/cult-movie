import React, {useEffect, useRef} from 'react';
import api from '../../api/axiosConfig';
import {useParams} from 'react-router-dom';
import {Container, Row, Col} from 'react-bootstrap';
import ReviewForm from '../reviewForm/ReviewForm';
import PropTypes from 'prop-types';

const Reviews = ({getMovieData,movie,reviews,setReviews}) => {

    const revText = useRef();
    let params = useParams();
    const movieId = params.movieId;

    useEffect(()=>{
        getMovieData(movieId);
    },[getMovieData, movieId])

    const addReview = async (e) =>{
        e.preventDefault();

        const rev = revText.current;

        try
        {
            const response = await api.post("/api/v1/reviews", {reviewBody: rev.value, imdbId: movieId});


            const updatedReviews = [...reviews, {body:rev.value, id: response.data.id}];

            rev.value = "";
            
            setReviews(updatedReviews);
        }
        catch(err)
        {
            console.error(err);
        }
        



    }

  return (
    <Container>
        <Row>
            <Col><h3>Reviews</h3></Col>
        </Row>
        <Row className="mt-2">
            <Col>
                <img src={movie?.poster} alt="" />
            </Col>
            <Col>
                {
                    <>
                        <Row>
                            <Col>
                                <ReviewForm handleSubmit={addReview} revText={revText} labelText = "Write a Review?" defaultValue=""/>  
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <hr />
                            </Col>
                        </Row>
                    </>
                }
                {
                    reviews.map((r, index) => {
                        return (
                            <React.Fragment key={r.id || index}>
                                <Row>
                                    <Col>{r.body}</Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <hr />
                                    </Col>
                                </Row>
                            </React.Fragment>                              
                        )
                    })
                }
            </Col>
        </Row>
        <Row>
            <Col>
                <hr />
            </Col>
        </Row>        
    </Container>
  )
}

Reviews.propTypes = {
    getMovieData: PropTypes.func.isRequired,
    movie: PropTypes.object,
    reviews: PropTypes.array,
    setReviews: PropTypes.func.isRequired,
    setMovie: PropTypes.func.isRequired,
};

export default Reviews