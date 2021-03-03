const LoginQuote = () => {
    const quote = {
        text: "The secret of your success is found in our daily routine.",
        author: "John C. Maxwell"
    }
    return (
        <div>
           <p className="tracking-wider text-xl">"{quote.text}"</p>
           <p>- {quote.author}</p> 
        </div>
        
    );
}

export default LoginQuote;