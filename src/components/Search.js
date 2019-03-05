import React, { Component } from 'react'
import { connect } from "react-redux";
import { changeLocation } from "./../actions/index";
function Search({ store, dispatch, props }) {

    let _location = "";

    function handleNewSearch(event) {
        event.preventDefault();
        props.changeLocation(_location.value)
        _location.value = '';
    }
    return (
        <div>
            <form onSubmit={e => {
                e.preventDefault();

                dispatch({
                    type: "CHANGE",
                    payload: _location.value
                })

            }}>
                <input type="text"
                    placeholder='Search by City'
                    ref={(input) => { _location = input; }} />
                <button type="submit">Search</button>
            </form>
        </div>
    )
}

export default connect()(Search);
