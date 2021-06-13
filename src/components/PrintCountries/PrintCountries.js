import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import styled from 'styled-components';
import {baseUrl, countries_all} from "../../constants/constants";
import {countriesFilter, renderByMax, renderByMin} from "../../store/contactSlice";
import ReactPaginate from 'react-paginate';
import {Link} from "react-router-dom";
import useDebounce from "../useDebounce/useDebounce";

const usersPerPage = 10;

const Blocks = styled.div`
        width: 70%;
        margin: 0 auto;
        border-radius: 10px;
        border: 1px solid grey;
        padding: 20px;  
        nav{ 
          display: grid;
          grid-template-columns: 1fr 4fr 3fr;
          background-color: blue;
          color: white;
          font-size: 18px;
          border-radius: 10px;
          border-bottom: 1px solid grey;
          border-left: 1px solid grey;
          height: 40px;
          padding-top: 10px;
        }
        section{
          font-size: 16px;
          display: grid;
          grid-template-columns: 1fr 4fr 3fr;
          margin-top: 15px;
          border-radius: 10px;
          border-bottom: 1px solid grey;
          border-left: 1px solid grey;
          height: 40px;
          padding-top: 10px;
          box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
        }    
        section:hover {
          width: 100%;
          background-color: #ffa;
          }
        p {
          text-align: center;
        }
        a {
          color: black;
          text-decoration: none;
        }
`
const InputBlocks = styled.div`
        display: flex;
        justify-content: space-between;
        width: 70%;
        margin: 20px auto;
        font-size: 20px;
        div {
          display: flex;
          justify-content: space-between;
        }
       input {
          margin-left: 20px;
       }

`

const PrintCountries = () => {
    const dispatch = useDispatch();
    const contact = useSelector(state => state.toolkit.contact);

    const [input, setInput] = useState('');

    const [debouncedValue, setDebouncedValue] = useState('');
    const debouncedSearch = useDebounce(displayByName, 500);


    const [pageNumber, setPageNumber] = useState(0);

    const pagesVisited = pageNumber * usersPerPage;


    const renderByMinMax = () => {
        if (input === 'false') {
            return dispatch(renderByMax())
        }else{
            return dispatch(renderByMin())
        }
    }
    renderByMinMax()


    const printCountries = () => {
        if (contact.length !== 0) {
            return (
                contact.slice(pagesVisited, pagesVisited + usersPerPage).map((ele, index) => {
                    return (
                        <Link to={`/${countries_all}/${ele.Country}`} key={index}>
                            <section>
                                <p>{index + pagesVisited + 1}</p>
                                <p>{ele.Country}</p>
                                <p>{ele.TotalConfirmed}</p>
                            </section>
                         </Link>
                    )
                }
                )
            )
        }
    }

    useEffect(() => {
        printCountries()
    }, [contact])






    const pageCount = Math.ceil(contact.length / usersPerPage)

    const changePage = ({selected}) => {
        setPageNumber(selected);
    };

    const change = (e) => {
        setInput(e.target.value);
    }




    function displayByName  ()  {
      fetch(`${baseUrl}/summary`)
          .then(response => response.json())
          .then(json => json.Countries)
          .then(data => dispatch(countriesFilter({
              data: data,
              debouncedValue: debouncedValue
          })))
    }

    useEffect(() => {
        debouncedSearch(debouncedValue)
    }, [debouncedValue])







    return (
        <div>
            <InputBlocks>
                <div>
                    <p>Поиск по имени</p>
                    <input className='input' type="text" placeholder={'Search'} value={debouncedValue} onChange={(e) => {
                        setDebouncedValue(e.target.value);
                    }}  />
                </div>
                <div>
                    <p>Максимальное количество</p>
                    <input type="radio"
                           checked={input === 'true'}
                           value="true"
                           onChange={change}
                           className='inputSmall'
                    />
                </div>
                <div>
                    <p>Минимальное количество</p>
                    <input type="radio"
                           checked={input === 'false'}
                           value="false"
                           onChange={change}
                           className='inputSmall'
                    />
                </div>
            </InputBlocks>
            <Blocks>
                <nav>
                    <p>№</p>
                    <p>Country</p>
                    <p>Total Confirmed</p>
                </nav>
                {printCountries()}
            </Blocks>
            <div className='pagination'>
                <ReactPaginate
                    previousLabel={"Previous"}
                    nextLabel={"Next"}
                    pageCount={pageCount}
                    onPageChange={changePage}
                    containerClassName={"paginationBttns"}
                    activeClassName={"paginationActive"}
                />
            </div>
        </div>
    );
};

export default PrintCountries;