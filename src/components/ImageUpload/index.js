import { Button } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import CloseTwoToneIcon from '@material-ui/icons/CloseTwoTone';
import HighlightOffTwoToneIcon from '@material-ui/icons/HighlightOffTwoTone';
import PhotoIcon from '@material-ui/icons/Photo';
import PublishTwoToneIcon from '@material-ui/icons/PublishTwoTone';
import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';

const ImageUpload = (props) => {
	const {
		name,
		title,
		subtitle,
		description,
		setFieldValue,
		error,
		value
	} = props;

	const [files, setFiles] = useState(value);
	const [thumbs, setThumbs] = useState([])
	const isError = error !== null;

	const {
		isDragActive,
		isDragAccept,
		isDragReject,
		open,
		getRootProps,
		getInputProps
	} = useDropzone({
		noClick: true,
		noKeyboard: true,
		multiple: false,
		accept: 'image/*',
		onDrop: (acceptedFiles) => {
			const newFiles = acceptedFiles.map((file) =>
				Object.assign(file, {
					preview: URL.createObjectURL(file)
				})
			);
			setFiles(newFiles);
			setFieldValue(name, newFiles);
		}
	});

	const reset = (e) => {
		setFiles([]);
		setThumbs([]);
		setFieldValue(name, []);
		e.preventDefault();
	};

	useEffect(() => {
		if (files && files.length === 0 && value && value.length === 1) {
			setFiles(value.map(f => {
				if (f.__typename === 'UploadFile') {
					return {
						preview: f.formats.small.url
					}
				}
			}));
		}
		if (thumbs.length !== files.length && files.length > 0) {
			let i=0;
			const newThumbs = files ? files.map((file) => {
				return (
					<div
						key={file.name+i}
						className="overflow-hidden text-center font-weight-bold text-success d-flex justify-content-center align-items-center">
							<img
								className="img-fluid rounded-sm"
								src={file.preview}
								alt={file.name}
								style={{maxWidth: "80%"}}
							/>
					</div>
				);
				i++;
			}) : [];
			setThumbs(newThumbs);
		}
		
	}, [error, files, value])


	return (
		<>
			<div className="d-flex align-items-center justify-content-center">
				<div className="dropzone rounded border-0 w-100 text-center">
					<div {...getRootProps({ className: 'dropzone-upload-wrapper' })}>
						<input {...getInputProps()} />
						<div className="dropzone-inner-wrapper rounded align-items-center dropzone-avatar">
							<div className="rounded m-2 align-items-center">
							
								{ thumbs.length > 0 && 
									<div>
										<div className="text-black-50 mb-2 font-size-lg font-weight-bold">{title}</div>
										{thumbs}
									</div>
								}

								{ thumbs.length === 0 &&
								<div>
									{ isDragAccept && (
										<div className="rounded mx-5 overflow-hidden bg-success text-center font-weight-bold text-white d-flex justify-content-center align-items-center">
											<CheckIcon className="d-140" />
										</div>
									)}
									{ isDragReject && (
										<div className="rounded overflow-hidden bg-danger text-center font-weight-bold text-white d-flex justify-content-center align-items-center">
											<CloseTwoToneIcon className="d-140" />
										</div>
									)}
									{ !isDragActive && (
										<div className="rounded overflow-hidden bg-neutral-dark text-centerfont-weight-bold text-black-50 d-flex justify-content-center align-items-center">
											<PhotoIcon className="d-140" />
											<div className="card-header--title text-center d-block">
												<small className="text-second">{title}</small>
												<b>{subtitle}</b>
												<p className="font-size-xs text-black-50">{description}</p>
												{ isError && <span className="text-danger text-center">{error}</span> }
											</div>
										</div>
									)}
									
								</div>
								}
								{ thumbs.length > 0 &&
									<Button 
										onClick={reset}
										className="btn-icon mx-2 mt-2 border-0 text-indent-0 d-40 badge-circle btn-primary text-white">
										<HighlightOffTwoToneIcon />
									</Button>
								}
								{ thumbs.length === 0 &&
									<Button
										onClick={open}
										className="btn-icon mx-2 mt-2 border-0 text-indent-0 d-40 badge-circle btn-primary text-white">
										<PublishTwoToneIcon />
									</Button>
								}
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default ImageUpload;