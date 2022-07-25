exports.getErrorMessage = (err) => {
    // processes any error
    let errorMessage = err.message;
    // only mongoose errors have .errors object in them (this is the way to distinct them from other errors)
    if (err.errors) {
        // TO SHOW ONLY THE FIRST -> errorMessage = Object.values(err.errors)[0].message;

        // TO SHOW ALL ERRORS
        errorMessage = Object.values(err.errors).map(a => a.message
        ).join(`\n`);
        // console.log(errorMessage);
    }
    return errorMessage
}