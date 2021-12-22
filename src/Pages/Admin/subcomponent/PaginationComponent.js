import ReactPaginate from 'react-paginate';


const PaginationComponent = ({pageCount, handlePageClick}) => {
  
    return(
        <ReactPaginate 
            previousLabel="Previous"
            nextLabel="Next"
            breakLabel="..."
            pageCount={pageCount}
            onPageChange={handlePageClick}
            previousClassName="page-item"
            nextClassName="page-item"
            pageLinkClassName="page-link"
            previousLinkClassName="page-link"
            nextLinkClassName="page-link"
            activeLinkClassName="activeLabelClass"
            activeClassName="page-item active"
            containerClassName="pagination pagination-sm"
        />
    )
}

export default PaginationComponent;