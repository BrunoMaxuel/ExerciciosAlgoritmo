

function imshow(matrix){
	
	if (matrix == null){
		console.log("A matriz passada para imshow está nula");
		return 
	}
	
	let mat;
	if (matrix.hasOwnProperty("length")){
		mat = cv.matFromArray(matrix.length,matrix[0].length, cv.CV_8UC1, [].concat(...matrix));
	} else {
		mat = matrix;
	}

	let dst = new cv.Mat();
	let dsize = new cv.Size(512,512);

	cv.resize(mat, dst, dsize, 0, 0, cv.INTER_AREA);
	cv.imshow('canvasOutput', dst);
	console.log("showing");
	mat.delete();
}


function matChannelToMatrix(src, channel){
	//cria a matriz de resposta
	var newMat = [];
	for (var i = 0; i < src.rows; i++){
		newMat.push([]);
	}
	
	for (var x = 0; x < src.rows; x++){
		for (var y = 0; y < src.cols; y++){
			//newMat[x][y] = src.data[x * src.cols * src.channels() + y * src.channels() + channel];
			//let pixel = src.charPtr(x, y);
			//newMat[x][y] = pixel[channel];
			newMat[x][y] = src.ucharAt(x, y * src.channels());
		}
	}
	
	return newMat;
}

function matToMatrix(src){
	let R = matChannelToMatrix(src, 0);
	let G = matChannelToMatrix(src, 1);
	let B = matChannelToMatrix(src, 2);
	
	return [R,G,B];
}


function mergeMatrixesIntoMat(R, G, B){
	let matR = cv.matFromArray(R.length,R[0].length, cv.CV_8UC1, [].concat(...R));
	let matG = cv.matFromArray(G.length,G[0].length, cv.CV_8UC1, [].concat(...G));
	let matB = cv.matFromArray(B.length,B[0].length, cv.CV_8UC1, [].concat(...B));
	
	let matVec = new cv.MatVector();
	matVec.push_back(matR);
	matVec.push_back(matG);
	matVec.push_back(matB);
	
	let src = new cv.Mat();
	
	cv.merge(matVec, src);
	
	matVec.delete();
	
	return src;
}


function matToArray(src){
	//cria a matriz de resposta
	var newMat = [];
	for (var i = 0; i < src.rows; i++){
		newMat.push([]);
	}
	
	i = 0;
	for (var x = 0; x < src.rows; x++){
		for (var y = 0; y < src.cols; y++, i++){
			newMat[x][y] = src.data[i];
		}
	}
	
	return newMat;
	
}


