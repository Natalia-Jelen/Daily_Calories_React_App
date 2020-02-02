import React, { useState, useEffect } from 'react';
import authService from './api-authorization/AuthorizeService'
import { Alert, Container, Row, Col, Button, ListGroup, ListGroupItem, Input } from 'reactstrap';
import axios from 'axios';
import { ProductItem } from './ProductItem'
import './DailyProducts.css';

export const DailyProducts = (props) => { //pobieranie z bazy
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const [userGoal, setUserGoal] = useState(0);

    const [breakfastItems, setBreakfastItems] = useState([]); //zapis do bazy 
    const [lunchItems, setLunchItems] = useState([]);
    const [dinnerItems, setDinnerItems] = useState([]);

    let productsObject = {};
    let allProductsCalories = 0;

    const getApplicationUserId = async () => { //pobieranie ID uzytkownika 
        const userProfile = await authService.getUser();

        return userProfile.sub;
    }

    useEffect(() => { 
        const getUsersDatas = async () => {
            try {
                const applicationUserId = await getApplicationUserId();
                const response = await axios.get(`api/UsersDatas/${applicationUserId}`);
                setUserGoal(response.data.goal);
            } catch (error) {
                console.log('No user data:', error);
            } finally {
                setLoading(false);
            }
        }
        const getProducts = async () => {
            try {
                const response = await axios.get("api/Products");
                setProducts(response.data);
            } catch (error) {
                console.log('No products data:', error);
            }
        }

        getUsersDatas();
        getProducts();
    }, []);

    products.forEach(product => productsObject[product.productId] = {
        description: product.description,
        caloriesAmount: product.caloriesAmount
    });

    breakfastItems.forEach(item => {
        const productCaloriesPerGram = (productsObject[item.productId] ? productsObject[item.productId].caloriesAmount : 0) / 100;
        allProductsCalories += productCaloriesPerGram * item.amount;
    });
    lunchItems.forEach(item => {
        const productCaloriesPerGram = (productsObject[item.productId] ? productsObject[item.productId].caloriesAmount : 0) / 100;
        allProductsCalories += productCaloriesPerGram * item.amount;
    });
    dinnerItems.forEach(item => {
        const productCaloriesPerGram = (productsObject[item.productId] ? productsObject[item.productId].caloriesAmount : 0) / 100;
        allProductsCalories += productCaloriesPerGram * item.amount;
    });
    const caloriesLeft = Math.round(userGoal - allProductsCalories);

    const addBreakfastItem = () => { 
        const items = [...breakfastItems, {
            productId: 0,
            amount: 0
        }];
        setBreakfastItems(items);
    }
    const addLunchItem = () => {
        const items = [...lunchItems, {
            productId: 0,
            amount: 0
        }];
        setLunchItems(items);
    }
    const addDinnerItem = () => {
        const items = [...dinnerItems, {
            productId: 0,
            amount: 0
        }];
        setDinnerItems(items);
    }

    const removeBreakfastItem = (itemIndex) => {
        const items = breakfastItems.filter((item, index) => index !== itemIndex);
        setBreakfastItems(items);
    } //obs³uga x
    const removeLunchItem = (itemIndex) => {
        const items = lunchItems.filter((item, index) => index !== itemIndex);
        setLunchItems(items);
    }
    const removeDinnerItem = (itemIndex) => {
        const items = dinnerItems.filter((item, index) => index !== itemIndex);
        setDinnerItems(items);
    }

    const onBreakfastItemChange = (index, value) => {
        let items = [...breakfastItems];
        items[index] = {
            ...breakfastItems[index],
            ...value
        };
        setBreakfastItems(items);
    }
    const onLunchItemChange = (index, value) => {
        let items = [...lunchItems];
        items[index] = {
            ...lunchItems[index],
            ...value
        };
        setLunchItems(items);
    }
    const onDinnerItemChange = (index, value) => {
        let items = [...dinnerItems];
        items[index] = {
            ...dinnerItems[index],
            ...value
        };
        setDinnerItems(items);
    }

    const renderDailyProducts = () => {
        return (
            <Container>
                <Container>
                    <Alert>
                    <Row>
                            <Col><h3 className="text-uppercase">Breakfast</h3></Col>
                        <Col><Button color="success" className="float-right" onClick={addBreakfastItem}> + </Button></Col>
                        </Row>
                        </Alert>
                    <Row>
                        <Col>
                            <ListGroup>
                                {breakfastItems.map((item, index) =>
                                    <ListGroupItem key={index}>
                                        <Container>
                                            <Row>
                                                <Col md="5"><ProductItem key={index} index={index} value={item.productId} onChange={onBreakfastItemChange} /></Col>
                                                <Col md="3"><Input key={index} type="text" name="cal" value={`${(productsObject[item.productId] ? productsObject[item.productId].caloriesAmount : 0)} kcal`} disabled /></Col>
                                                <Col md="2"><Input key={index} type="number" name="amount" value={item.amount} onChange={(event) => onBreakfastItemChange(index, { amount: parseInt(event.target.value, 10) })} required /></Col>
                                                <Col md="1" className="gram">gram</Col>
                                                <Col md="1"><Button key={index} color="danger" onClick={() => removeBreakfastItem(index)}> X </Button></Col>
                                            </Row>
                                        </Container>
                                    </ListGroupItem>
                                )}
                            </ListGroup>
                        </Col>
                    </Row>
                </Container>
                <Container>
                    <Alert>
                    <Row>
                            <Col><h3 className="text-uppercase">Lunch</h3></Col>
                        <Col><Button color="success" className="float-right" onClick={addLunchItem}> + </Button></Col>
                        </Row>
                        </Alert>
                    <Row>
                        <Col>
                            <ListGroup>
                                {lunchItems.map((item, index) => 
                                    <ListGroupItem key={index}>
                                        <Container>
                                            <Row>
                                                <Col md="5"><ProductItem key={index} index={index} value={item.productId} onChange={onLunchItemChange} /></Col>
                                                <Col md="3"><Input key={index} type="text" name="cal" value={`${(productsObject[item.productId] ? productsObject[item.productId].caloriesAmount : 0)} kcal`} disabled /></Col>
                                                <Col md="2"><Input key={index} type="number" name="amount" value={item.amount} onChange={(event) => onLunchItemChange(index, { amount: parseInt(event.target.value, 10) })} required /></Col>
                                                <Col md="1" className="gram">gram</Col>
                                                <Col md="1"><Button key={index} color="danger" onClick={() => removeLunchItem(index)}> X </Button></Col>
                                            </Row>
                                        </Container>
                                    </ListGroupItem>
                                )}
                            </ListGroup>
                        </Col>
                    </Row>
                </Container>
                <Container>
                    <Alert>
                    <Row>
                            <Col><h3 className="text-uppercase">Dinner</h3></Col>
                        <Col><Button color="success" className="float-right" onClick={addDinnerItem}> + </Button></Col>
                        </Row>
                        </Alert>
                    <Row>
                        <Col>
                            <ListGroup>
                                {dinnerItems.map((item, index) =>
                                    <ListGroupItem key={index}>
                                        <Container>
                                            <Row>
                                                <Col md="5"><ProductItem key={index} index={index} value={item.productId} onChange={onDinnerItemChange} /></Col>
                                                <Col md="3"><Input key={index} type="text" name="cal" value={`${(productsObject[item.productId] ? productsObject[item.productId].caloriesAmount : 0)} kcal`} disabled /></Col>
                                                <Col md="2"><Input key={index} type="number" name="amount" value={item.amount} onChange={(event) => onDinnerItemChange(index, { amount: parseInt(event.target.value, 10) })} required /></Col>
                                                <Col md="1" className="gram">gram</Col>
                                                <Col md="1"><Button key={index} color="danger" onClick={() => removeDinnerItem(index)}> X </Button></Col>
                                            </Row>
                                        </Container>
                                    </ListGroupItem>
                                )}
                            </ListGroup>
                        </Col>
                    </Row>
                </Container>
                <Container>
                    <Alert>
                        <h3>
                    <Row className='font-weight-bold'>
                        <Col md="2"></Col>
                        <Col md="2">{userGoal} kcal</Col>
                        <Col md="1"> - </Col>
                                <Col md="2">{allProductsCalories ? Math.round(allProductsCalories) : 0} kcal</Col>
                                <Col md="1"> = </Col>
                                <Col md="2" className={(caloriesLeft < 0) ? 'text-danger' : 'text-success'}>{caloriesLeft || userGoal} kcal</Col> 
                        <Col md="2"></Col>
                            </Row>
                            </h3>
                    </Alert>
                </Container>
            </Container>
        );
    }

    let contents = loading
        ? <h3><em>Loading...</em></h3>
        : renderDailyProducts();

    return (
        <div>
            {contents}
        </div>
    );
}