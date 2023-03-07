const price = document.querySelector('.price');
const category = document.querySelector('.category');
const btn = document.querySelector('.btn');
const description = document.querySelector('.description');

const myForm = document.querySelector('#my-form');

const itemList = document.querySelector('#item');

const itemList1 = document.querySelector('#item1');

const itemList2 = document.querySelector('#item2');

myForm.addEventListener('submit',addData);

itemList.addEventListener('click',removeItem);







// data from form to console and local storage
let i = 0;
function addData(e){
    e.preventDefault();

    i++

    if (price.value === ''||description.value === '' || category.value ===''){
        console.log('error')

    }
    else{
        console.log('success')
        console.log(description.value)
    }

    let obj1 = {
        'price' : price.value,
        'dish' : description.value,
        'table' : category.value
    }


    // post method 
    axios.post('https://crudcrud.com/api/a6a2580da0e146baa547a299dd9fbc86/orderDetails',obj1)
    .then(response=>{console.log(response)})
    .catch(err=>{console.log(err)})

    // get method 
    axios.get('https://crudcrud.com/api/a6a2580da0e146baa547a299dd9fbc86/orderDetails')
    .then(response=>{
        console.log(response);
        for (var i=0; i<response.data.length;i++){
            showOrder(response.data[i])
        }
    })
    .catch(err=>{console.log(err)})




    // addding form to li

    function showOrder(user){
        const li = document.createElement('li');
        li.className= 'list';

        if (user.table === 'Table 1'){
            li.appendChild(document.createTextNode(user.price+' '+user.dish+' '+user.table+' '+user._id+' '));
            itemList.appendChild(li);
        }
        else if (user.table === 'Table 2'){
            li.appendChild(document.createTextNode(user.price+' '+user.dish+' '+user.table+' '+user._id+' '));
            itemList1.appendChild(li);
        }
        else if(user.table === 'Table 3'){
            li.appendChild(document.createTextNode(user.price+' '+user.dish+' '+user.table+' '+user._id+' '));
            itemList2.appendChild(li);
        }
        


        li.appendChild(document.createTextNode(user.price+' '+user.dish+' '+user.table+' '+user._id+' '));
        itemList.appendChild(li);

        // creating delete button

        const del = document.createElement('button');
        del.className = 'del_btn btn btn-danger';
        del.appendChild(document.createTextNode('Delete'));
        li.appendChild(del);

    }




}

// removing data in dom and local storage

function removeItem(event){
    if(event.target.classList.contains('del_btn')){
        let li = event.target.parentElement;
        let data = li.textContent;
        data = data.split(' ')
        let id = data[3]
        // deleting from database
        axios.delete(`https://crudcrud.com/api/a6a2580da0e146baa547a299dd9fbc86/orderDetails/${id}`)
        .then(response=>{console.log(response)})
        .catch(err=>{console.log(err)})

        itemList.removeChild(li)
    }
    
}

