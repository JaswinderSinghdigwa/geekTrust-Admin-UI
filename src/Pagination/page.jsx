import React, { useEffect, useState } from 'react';
import pagination from './pagination';
import {
    IoChevronBack,
    IoChevronForward,
} from "react-icons/io5";
import {
    BiFirstPage,
    BiLastPage,
} from "react-icons/bi";


const Page = ({ sumOfItem, pageChange }) => {
    const [paginationProps, setPaginationProps] = useState({});

    /*
   *  Fetches paginationProps using `Pagination` function and
   *  updates the state of paginationProps, when component mounts.
   */

    useEffect(() => {
        const data = pagination(sumOfItem)
        pageChange(data.startDataIndex, data.endDataIndex);
        setPaginationProps(data)
    }, [])

    /*
   *  Fetches paginateProps using `Pagination` function and ̰
   *  updates the state of paginationProps, when there is a change in totalItems.
   *  The idea behind the implementation of this useeffect is that, when user searches for any user, in addition to displaying the users, we also need to update the pagination bar.
   */
    useEffect(() => {
        const data = pagination(sumOfItem);
        pageChange(data.startDataIndex, data.endDataIndex);
        setPaginationProps(data)
    }, [sumOfItem])


    /**
   * @description calls the pagination function and updates the paginationProps state and
   * calls the PageChange function with the new paginationProps state.
   * @param {string} source source of the page change.
   */

    const pageChangeHandler = (path) => {
        let { sumOfPages, viewPage } = paginationProps;
        switch (path) {
            case 'END':
                viewPage = sumOfPages;
                break;
            case 'START':
                viewPage = 1;
                break;
            case 'NEXT':
                viewPage++;
                break;
            case 'PREV':
                viewPage--;
                break;
            default:
                viewPage = path;
        }
        const data = pagination(sumOfItem, viewPage, 10);
        pageChange(data.startDataIndex, data.endDataIndex);
        setPaginationProps(data);
    }
    return (
        <>
            <div style={{ dispaly: "flex", justifyContent: "center", margin: "2rem auto" }}>
                <div style={{ dispaly: "flex" }}>
                    <button className='controlButton' onClick={() => pageChangeHandler("START")} disabled={paginationProps.viewPage === 1}>
                        <BiFirstPage />
                    </button>
                    <button className='controlButton' onClick={() => pageChangeHandler("PREV")} disabled={paginationProps.viewPage === 1}>
                        <IoChevronBack />
                    </button>
                </div>
                {paginationProps.pages?.map((val) => {
                    <button className='pageButton' kay={val} onClick={() => paginationProps.viewPage !== val && pageChangeHandler(val)} disabled={
                        paginationProps.viewPage === val
                    } style={
                        paginationProps.viewPage === val ? { backgroundColor: "#2196f3", color: "white" } : { backgroundColor: "#fff", color: "#2196f3" }
                    }>{val}</button>
                })}
                <div style={{ dispaly: "flex" }}>
                    <button className='controlButton' onClick={() => pageChangeHandler("NEXT")} disabled={paginationProps.viewPage === paginationProps.endPageNumber}>
                        <IoChevronForward />
                    </button>
                    <button className='controlButton' onClick={() => pageChangeHandler("PREV")} disabled={paginationProps.viewPage === paginationProps.sumOfPages}>
                        <BiLastPage />
                    </button>
                </div>
            </div>
        </>
    );
}
export default Page


