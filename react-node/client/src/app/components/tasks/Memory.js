import React, { useState } from 'react';

const Memory = () => {
  const [newvalue, setValue] = useState({ bytes: '' });

  const onchange = (e) => {
    const { name, value } = e.target;
    setValue({ ...newvalue, [name]: sizeUnits(value) });
    console.log(newvalue);
  };

  const sizeUnits = (bytes) => {
    if (bytes >= 1099511627776) {
      return (bytes = (bytes / 1099511627776).toFixed(2) + 'TB');
    } else if (bytes >= 1073741824) {
      return (bytes = (bytes / 1073741824).toFixed(2) + 'GB');
    } else if (bytes >= 1048576) {
      return (bytes = (bytes / 1048576).toFixed(2) + 'MB');
    } else if (bytes / 1024) {
      return (bytes = (bytes / 1024).toFixed(2) + 'KB');
    } else if (bytes >= 1) {
      return (bytes = bytes + 'bytes');
    } else if (bytes == 1) {
      return (bytes = bytes + 'bytes');
    } else {
      return bytes;
    }
  };

  return (
    <div>
      <input type="text" name="bytes" onChange={onchange} />
      <br/>
      memory space=={newvalue.bytes}
    </div>
  );
};

export default Memory;