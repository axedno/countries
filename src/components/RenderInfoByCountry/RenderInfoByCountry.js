import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import styled from "styled-components";
import picture1 from '../../image/picture1.png'
import picture2 from '../../image/picture2.png'
import picture3 from '../../image/picture3.png'
import {useHistory} from "react-router";
import {countries_all} from "../../constants/constants";
import {Button} from "react-bootstrap";
import {commentsDelete, commentsNew} from "../../store/contactSlice";



const Show = styled.section`
        width: 30%;
        margin: 200px auto;
        text-align: center;
        color: black;
        border-radius: 20px;
        font-size: 20px;
        div {
           padding: 20px; 
           border: 1px solid var(--color);
           height: 350px;
           border-radius: 20px;   
        }
        p{ 
           margin-top: 10px;
        }
        img{
           height: 45px;
        }
        button{
           width: 40%;
           margin-top: 20px;
           background-color: var(--color);
           height: 30px;
           color: white;
           border: none;
        }
`

const Block = styled.section`
        display: flex;
        justify-content: space-between;
        margin-top: 10px;
`

const Comments = styled.div`
        margin: 50px auto;
        width: 50%;
        border: 1px solid blue;
        padding: 40px;
        textarea {
          width: 500px;
          height: 100px; 
        }
    
`
const CommentBlock = styled.div`
        border: 1px solid var(--color);
        padding: 20px;
        margin-top:20px;
        p {
          margin-top: 20px;
        }
`


const RenderInfoByCountry = (props) => {

    const history = useHistory();

    const dispatch = useDispatch();

    const contact = useSelector(state => state.toolkit.contact)
    const comments = useSelector(state => state.toolkit.comments)

    let key = props.match.params.name;

    const [value, setValue] = useState('');


    const showInfo = () => {
        const getCountry =  contact.filter(item => item.Country === key)
        return (
            getCountry.map((item, index) => {
                return (
                    <div  key={index}>
                        <h2>{item.Country}</h2>
                        <Block>
                            <img src={picture1} alt="img"/>
                            <p>Total Confirmed</p>
                            <p>{item.TotalConfirmed}</p>
                        </Block>
                        <Block>
                            <img src={picture3} alt="img"/>
                            <p>Total Deaths</p>
                            <p>{item.TotalDeaths}</p>
                        </Block>
                        <Block>
                            <img src={picture2} alt="img"/>
                            <p>Total Recovered</p>
                            <p>{item.TotalRecovered}</p>
                        </Block>
                        <button onClick={() => history.push(`/${countries_all}`)}>На главную</button>
                    </div>
                )
            })
        )
    }



    const putComment = () => {
        dispatch(commentsNew({
            value,
            key
        }))
    }



    const  displayComments = () => {

        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        let yyyy = today.getFullYear();

        today = mm + '/' + dd + '/' + yyyy;
        if(comments[key]) {
            return (
                comments[key].map((item, index) => {
                    return (
                        <CommentBlock key={index}>
                            <p>Номер: {index + 1} </p>
                            <p>Дата: {today}</p>
                            <p className='fruit__comment'>{item}</p>
                            <Button onClick={() => dispatch(commentsDelete({index, key}))} variant="primary">Delete</Button>
                        </CommentBlock>
                    )
                })
            )
        }
    }



    return (
        <div>
            <Show>
                {showInfo()}
            </Show>
            <Comments>
                <textarea onChange={(e) => setValue(e.target.value)}/>
                {displayComments()}
                <div>
                    <Button onClick={putComment} variant="danger" style={{marginTop: '50px', marginBottom: '50px'}}>Add comments</Button>
                </div>
            </Comments>
        </div>

    );
};

export default RenderInfoByCountry;