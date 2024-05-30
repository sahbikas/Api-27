class AccessDenied extends Error{
    constructor() {
        super();
        this.data = null;
        this.message = "Access denied"
        this.code = 403
    }
}

module.exports = AccessDenied