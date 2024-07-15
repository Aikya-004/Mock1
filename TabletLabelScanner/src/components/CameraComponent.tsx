import React, { useState } from 'react';
import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

const CameraComponent: React.FC = () => {
    const [photo, setPhoto] = useState<string | null>(null);

    const takePhoto = async () => {
        try {
            const image = await Camera.getPhoto({
                quality: 90,
                allowEditing: false,
                resultType: CameraResultType.Uri,
                source: CameraSource.Camera
            });

            if (image.webPath) {
                setPhoto(image.webPath);
            }
        } catch (error) {
            console.error('Error taking photo:', error);
        }
    };

    const uploadPhoto = async () => {
        if (!photo) return;
    
        const response = await fetch(photo);
        const blob = await response.blob();
        const formData = new FormData();
        formData.append('file', blob, 'photo.jpg');
    
        try {
            const res = await fetch('http://127.0.0.1:5000/upload', {
                method: 'POST',
                body: formData,
            });
    
            const data = await res.json();
            console.log('OCR Result:', data.text);
        } catch (error) {
            console.error('Error uploading photo:', error);
        }
    };
    

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Camera</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <IonButton onClick={takePhoto}>Take Photo</IonButton>
                {photo && <img src={photo} alt="Captured" />}
                <IonButton onClick={uploadPhoto}>Upload Photo</IonButton>
            </IonContent>
        </IonPage>
    );
};

export default CameraComponent;
