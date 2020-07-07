import React from 'react';
import Image from './Image';
import PropTypes from 'prop-types';

const ListImages = ({images}) => {
    return (
        <div className="col-12 p-5 row">
            {images.map(image =>(
                <Image
                    key={image.id}
                    image={image}
                />
            ))}
        </div>
      );
}

ListImages.propTypes = {
    images: PropTypes.array.isRequired
}

export default ListImages;