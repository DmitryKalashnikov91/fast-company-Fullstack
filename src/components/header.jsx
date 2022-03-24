import React from "react";
 

const Header = () => {
    let str = 'никто не придет'
    let str1 = 'человек тусанет с тобой сегодня';
    let str2 = 'человека тусанут с тобой сегодня';

const renderFraze = (n) => {
   let renderNStr = String(n);
   let countStr = renderNStr.slice(renderNStr.length-1);
   if (+countStr === 1 || +countStr > 4 && +countStr < 22) {
       return str1;
   } else if (+renderNStr === 0){
       return str;
    } else return str2; 
};
   let n = 1; 
   let string = `${renderFraze(n)}`;
   let classes = "badge m-2 ";
   classes += n === 0 ? "bg-warning" : "bg-primary"
   let zeroSpan = <span className={classes}>{string}</span>;
    if (n === 0) { 
        return( 
            <>
                {zeroSpan}
            </>
            )
        } else return <>{String(n)} {zeroSpan}</>
};

export default Header;