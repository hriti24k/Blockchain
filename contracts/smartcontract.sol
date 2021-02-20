pragma solidity ^0.5.0;

contract smartcontract {
    string public bookname;
    uint public bookcount = 0;
    mapping(uint => book) public books;

    struct book {
        uint bookid;
        string bookname;
        uint rent;
        address borrower;
        
    }

    event recordcreated(
        uint bookid,
        string bookname,
        uint rent,
        address borrower
        
    );

    

     function recordbook(string memory _bookname, uint _rent) public {
	

        address borrower=msg.sender;
        require(bytes(_bookname).length > 0);
        require(_rent > 0);
        bookcount ++;
        books[bookcount] = book(bookcount, _bookname,_rent, borrower);
        emit recordcreated(bookcount, _bookname, _rent, borrower);
    }
}