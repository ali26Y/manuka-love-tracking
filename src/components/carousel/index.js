import React from 'react';
import ImageGallery from 'react-image-gallery';

const settings = {
    thumbnailPosition: 'left',
    slideDuration: 450,
    slideInterval: 2000,
    slideOnThumbnailOver: false,
};

const Carousel = props => {
    const { data } = props;
    const generatePhotos = () => {
        let photos = data.location.locationDetailPhoto.map(locationPhoto => ({
            original: locationPhoto.photo._meta.Location,
            thumbnail: locationPhoto.photo._meta.Location,
        }));
        if (data.beekeeper.isPublic) {
            photos.unshift({
                original: data.beekeeper.beekeeperProfileImage._meta.Location,
                thumbnail: data.beekeeper.beekeeperProfileImage._meta.Location,
            });
        }
        return photos;
    };

    return (
        <div>
            <ImageGallery
                items={generatePhotos()}
                lazyLoad={true}
                thumbnailPosition={settings.thumbnailPosition}
                slideDuration={parseInt(settings.slideDuration)}
                slideInterval={parseInt(settings.slideInterval)}
                slideOnThumbnailOver={settings.slideOnThumbnailOver}
                additionalClass="app-image-gallery"
            />
        </div>
    );
};

export default Carousel;
