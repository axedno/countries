import React, {useEffect} from 'react';
import covid from "../../image/covid.png";
import styled from "styled-components";
import {useDispatch} from "react-redux";
import axios from "axios";
import {baseUrl} from "../../constants/constants";
import {countries} from "../../store/contactSlice";


const H1 = styled.h1 `
    color: var(--color);
    text-align: center;
    margin-top: 20px;
`
const Img = styled.img`
     width: 400px;
     height: 150px;
     margin: 30px auto;
     display:block;
`

const Title = () => {

    const dispatch = useDispatch();

    const getCountries = async () => {
        try {
            const res = await axios.get(`${baseUrl}/summary`)
            await dispatch(countries(res.data.Countries))
        } catch (err){
            throw Error(err)
        }
    }

    useEffect(() => {
        getCountries()
    },[])


    return (
        <div>
            <H1>Covid статитика</H1>
            <Img src={covid} alt="covid"/>
        </div>
    );
};

export default Title;