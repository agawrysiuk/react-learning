import React, {Component} from "react";
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from '../../axios-orders';
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/WithErrorHandler/withErrorHandler";

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

class BurgerBuilder extends Component {

    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: true,
        error: false
    }

    componentDidMount() {
        axios.get('/ingredients.json')
            .then(response => {
                this.setState({ingredients: response.data, loading: false})
            })
            .catch(error => {
                this.setState({error: true})
            });
    }

    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey]
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        this.setState({purchasable: sum > 0});
    }

    addIngredientHandler = (type) => {
        const updatedCount = this.state.ingredients[type] + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedCount;
        const updatedPrice = this.state.totalPrice + INGREDIENT_PRICES[type];

        this.setState({totalPrice: updatedPrice, ingredients: updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const updatedCount = this.state.ingredients[type] - 1;
        if (updatedCount < 0) {
            return;
        }
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedCount;
        const updatedPrice = this.state.totalPrice - INGREDIENT_PRICES[type];

        this.setState({totalPrice: updatedPrice, ingredients: updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    }

    purchaseHandler = () => {
        this.setState({purchasing: true})
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        // ".json" tells Firebase to store it in JSON
        this.setState({loading: true});
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Arek Schwarzenegger',
                address: {
                    street: 'Testosteron 1/2',
                    zipCode: '22222',
                    country: 'Poland'
                },
                email: 'test@test.com',
            },
            deliveryMethod: 'fastest'
        }
        axios.post('/orders.json', order)
            .then(response => {
                console.log(response);
                this.setState({loading: false, purchasing: false});
            })
            .catch(error => {
                console.log(error)
                this.setState({loading: false, purchasing: false});
            });
    }

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {
                        this.state.loading
                            ? <Spinner/>
                            : <OrderSummary
                                ingredients={this.state.ingredients}
                                purchaseCancelled={this.purchaseCancelHandler}
                                purchaseContinued={this.purchaseContinueHandler}
                                price={this.state.totalPrice}/>
                    }
                </Modal>
                {
                    this.state.loading
                        ? [<p key={'errorText'}>Ingredients can't be loaded!</p>, <Spinner key={'errorSpinner'}/>]
                        : [<Burger ingredients={this.state.ingredients} key={'BurgerKey'}/>,
                            <BuildControls key={'BuildControlsKey'}
                                           ingredientAdded={this.addIngredientHandler}
                                           ingredientRemoved={this.removeIngredientHandler}
                                           disabled={disabledInfo}
                                           purchasable={this.state.purchasable}
                                           ordered={this.purchaseHandler}
                                           price={this.state.totalPrice}/>]
                }
            </Aux>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);
