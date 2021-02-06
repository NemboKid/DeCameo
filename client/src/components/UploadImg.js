import React, {useState} from 'react';

const UploadImg = (props) => {
    const [file, setFile] = useState("");
    const [filename, setFilename] = useState("");

    const submitImg = async () => {
        props.setImgLoad(true);
        const formData = new FormData();
        formData.append('file', file);
        formData.append('profileId', props.id);

        setFilename("");
        setFile("");
        props.setImgLoad(false);
    }

    const onChange = (e) => {
        setFile(e.target.files[0]);
        setFilename(e.target.files[0].name);
        e.preventDefault();
    }

    filename && submitImg();

    return (
            <div className="form-wrapper">
                <div className="form-input-row file-input">
                  <input id="files" type="file" onChange={onChange}  />
                  <label htmlFor="files" className="button-standard full-btn upload-foto-btn">Choose photo</label>
                </div>
            </div>
    );
};

export default UploadImg;
