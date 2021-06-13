import { createSlice } from '@reduxjs/toolkit'

const countriesGet = JSON.parse(localStorage.getItem('countries'))


export const contactSlice = createSlice({
    name: 'contacts',
    initialState: {
       contact: countriesGet ? countriesGet : [],
       comments: {}
    },
    reducers: {
        countries: (state, action) => {
            console.log(action.payload)
            state.contact = action.payload
        },
        countriesFilter: (state, action) => {
            state.contact =  action.payload.data.filter(item => {
                return  item.Country.toLowerCase().includes(action.payload.debouncedValue.toLowerCase())
            })
        },
        renderByMax:(state) => {
            state.contact.sort((a, b) => a.TotalConfirmed - b.TotalConfirmed)

        },
        renderByMin:(state) => {
            state.contact.sort((a, b) => b.TotalConfirmed - a.TotalConfirmed)
        },
        commentsNew:(state, action) => {
            if(state.comments.hasOwnProperty(action.payload.key)) {
                state.comments[action.payload.key].push(action.payload.value)
            } else {
                state.comments[action.payload.key] = [];
                state.comments[action.payload.key].push(action.payload.value)
            }
        },
        commentsDelete:(state, action) => {
            state.comments[action.payload.key].splice(action.payload.index, 1)
        }
    },
})


export const { countries, countriesFilter, renderByMax, renderByMin, commentsNew, commentsDelete } = contactSlice.actions

export default contactSlice.reducer