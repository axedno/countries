import React from 'react';
import {Switch, Route} from "react-router-dom";
import {countries_all} from "../constants/constants";
import PrintCountries from "./PrintCountries/PrintCountries";
import RenderInfoByCountry from "./RenderInfoByCountry/RenderInfoByCountry";

const Main = () => {


    return (
        <div>
            <Switch>
                <Route path={['/',`/${countries_all}`]}  exact component={PrintCountries}/>
                <Route path={`/${countries_all}/:name`}  exact component={RenderInfoByCountry}/>
            </Switch>
        </div>
    );
};

export default Main;