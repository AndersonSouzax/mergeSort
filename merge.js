let insertionSort = (inputArray) => {

    if(inputArray.length > 0){

        let outputArray = [];

        inputArray.forEach( (e,i,a) => {

            let index = outputArray.length;

            if(index > 0){

                while(index > 0 && outputArray[index - 1] >= e){
                    outputArray[index] = outputArray[index - 1];
                    index--;

                    debugger;
                }
            }

            outputArray[index] = e;

        });

        return outputArray;
    }
};

let merge = (left,right) => {

    let newArr = [];
    let totalSize = left.length + right.length;

    while(newArr.length < totalSize){

        if(right.length == 1 && left.length == 1){

            let insArray =  right[0] > left[0] ?
                            [ left[0],right[0] ] : [ right[0],left[0] ];

            newArr = newArr.concat(insArray);

        }else if(left.length == 0 || right.length == 0){

            let arr = left.length == 0 ? right : left;
            let size = arr.length;

            if(size == 1){
                newArr.push(arr[0]);
                continue;
            }

            let i = 1;
            let count = 0;
            let l;

            /* Ordenando individualmente um array */
            while(count < size){

                l = 0;
                let min = arr[0];

                for(i; i < size; i++){
                    if(arr[i] < min){
                        min = arr[i];
                        l = i;
                    }
                }

                arr[l] = 'a';
                arr = arr.filter( x => x != 'a');

                newArr.push(min);
                count++;
            }

        }else{

            //Objeto que guarda propriedades do menor elemento
            let min = { 'side' : 'l', 'v' : left[0],'i' : 0 };
            let i = 0, j = 0;

            for(i = 0; i < left.length; i++){

                for (j = 0; j < right.length; j++) {

                    if(left[i] < right[j]){
                        min.side = 'l';
                        min.v = left[i];
                        min.i = i;
                    }else{
                        min.v = right[j];
                        let k = j, l = j;

                        //Buscando menor elemento do array
                        //Se nao tem apenas 1 elemento
                        if(right.length > 1){

                            for(k; k < right.length; k++){

                                if(right[k] < min.v){
                                    min.v = right[k];
                                    l = k;
                                }
                            }

                            min.side = 'r';
                            min.i = l;

                            break;
                        }

                        min.side = 'r';
                        min.i = l;

                    }
                }

                newArr.push(min.v);

                if(min.side == 'l'){
                    left[min.i] = 'a';
                    left = left.filter( x => x != 'a');
                }else{
                    right[min.i] = 'a';
                    right = right.filter( x => x != 'a');
                }

                if(right.length == 0 || left.length){
                    break;
                }
            }

        }

    }

    return newArr;
};

let mergeSort = (vet) => {

    if(vet.length == 1){
        return vet;
    }

    let mid = Math.round( vet.length / 2 );
    let left = mergeSort( vet.slice(0,mid) );
    let right = mergeSort( vet.slice(mid) );

    let totalSize = left.length + right.length;

    //Podando árvore com até 30 elementos
    if(totalSize < 30){
        return insertionSort( left.concat(right) );
    }

    return merge(left,right);
};
