import React from 'react';
import PropTypes from 'prop-types';
 
 const save_storage = (mail_localstorage) =>{
        localStorage.setItem("mail_local",mail_localstorage);
        localStorage.setItem("backend_local",true);
    };

export default save_storage;