import React from "react";

// Paginate
import { PaginationControl } from "react-bootstrap-pagination-control";

import './Paginate.css';

interface Props {
    page: number
    last_page: number
    limit: number
    setPage(value: any):void
}

const Paginate = ({page, last_page, limit, setPage}: Props) => {
    return (
        <div className="paginate">
            <PaginationControl
                page={page}
                between={4}
                total={last_page*15}
                limit={15}
                changePage={(page) => {
                setPage(page); 
                }}
                ellipsis={1}
            />
        </div>
    );
}

export default Paginate;