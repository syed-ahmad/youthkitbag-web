import React, { useState, useEffect } from 'react';
import Title from './Title';

const ItemPage = ({ current, fetch, form, initialState, itemId }) => {

  const [item, setItem] = useState(initialState);

  useEffect(() => {
    if (itemId) {
      fetch(itemId);
    }
  }, [fetch, itemId]);
  
  useEffect(() => {
    if (current && current._id) {
      const newItem = {
        ...current,
        // groups: current.groups.map(g => {
        //   let group = {...g};
        //   group.available = g.available ? g.available.toString().substring(0,10) : '';
        //   return group;
        // }),
        imagesToUpload: 0
      };
      setItem(newItem);  
    }
  }, [current]);
  
  function itemIsLoding() {
    return itemId && !item._id;
  }

  function getTitle() {
    if (itemIsLoding()) {
      return 'Loading ...';
    }

    return item._id ? item.title : 'Create new item';
  }

  const Child = form;
  
  return (
    <div>
      <Title title={getTitle()} />
      <section id="main" className="container-fluid" aria-label="main body of content plus related links and features">
        <div className="container">
          <Child item={item} />
        </div>
      </section>
    </div>
  );

}

export default ItemPage;
