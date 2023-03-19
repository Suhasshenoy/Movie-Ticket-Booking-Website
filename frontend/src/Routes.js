import React from 'react';
import {BrowserRouter,Switch,Route} from "react-router-dom";
import PrivateRoute from './auth/helper/PrivateRoute';
import AdminRoute from './auth/helper/AdminRoute';
import AddMovie from './admin/AddMovie';
import Home from './core/Home';
import Movie from './user/Movie';
import Signin from './user/Signin';
import Signup from './user/Signup';
import AddTheatre from './admin/AddTheatre';
import AddScreen from './admin/AddScreen';
import AddShow from './admin/AddShow';
import DeleteMovie from './admin/DeleteMovie';
import Shows from './user/Shows';
import Reviews from './user/Reviews';
import AddReview from './user/AddReview';
import SeatsForShow from './user/SeatsForShow.';
import BookingSuccess from './core/BookingSuccess';
import ReviewAnalysis from './admin/ReviewAnalysis';


const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path = "/" exact component={Home}  />
                <Route path = "/signup" exact component={Signup}  />
                <Route path = "/signin" exact component={Signin}  />
                <Route path = "/movie" exact component={Movie}  />


                <PrivateRoute path = "/movie/:movieId" exact component={Movie} />
                <PrivateRoute path = "/reviews/:movieId" exact component={Reviews} />
                <PrivateRoute path = "/select/show/:movieId/:theatreId" exact component={Shows} />
                <PrivateRoute path = "/review/post/:movieId" exact component={AddReview} />
                <PrivateRoute path = "/select/seat/:showId/:theatreId/:movieId" exact component={SeatsForShow} />
                <PrivateRoute path = "/ticket/booked/:movieId" exact component={BookingSuccess} />

                


                
                <AdminRoute path = "/admin/add/movie" exact component={AddMovie} />
                <AdminRoute path = "/admin/add/theatre" exact component={AddTheatre} />
                <AdminRoute path = "/admin/add/screen" exact component={AddScreen} />
                <AdminRoute path = "/admin/add/show" exact component={AddShow} />
                <AdminRoute path = "/admin/delete/movie" exact component={DeleteMovie} />
                <AdminRoute path = "/admin/analyze/movie" exact component={ReviewAnalysis} />

                

            </Switch>
        </BrowserRouter>
    )
}


export default Routes;
