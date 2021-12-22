import {Pagination} from 'react-bootstrap';

const PaginationComponent = () => {
  let totalPages = 1;
  let active = 1;
  let items = [];
  for (let number = 1; number <= totalPages; number++) {
    items.push(
      <Pagination.Item key={number} active={number === active}>
        {number}
      </Pagination.Item>,
    );
  }
  
    return(
      <Pagination size="sm">
      <Pagination.Item key="first" >
        Previous
      </Pagination.Item>

        {items}

        <Pagination.Item key="last" >
        Next
      </Pagination.Item>
        
        </Pagination>
    )
}

export default PaginationComponent;