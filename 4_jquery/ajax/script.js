        $(document).ready(function(){
            // AJAX request
            $.ajax({
                url: 'https://fakestoreapi.com/products',
                method: 'GET',
                dataType: 'json',
                success: function(response){
                    // Display the list of products
                    console.log(response);
                    displayProducts(response);
                },
                error: function(xhr, status, error){
                    // Code to be executed in case of an error
                    console.error('Error:', status, error);
                }
            });

            // Function to display products
            function displayProducts(products) {
                var productListContainer = $('#productList');
                
                // Clear existing content
                productListContainer.empty();

                // Loop through each product and create HTML elements to display them
                products.forEach(function(product) {
                    var productHTML = '<div class="product">';
                    productHTML += '<img src="' + product.image + '"></img>';
                    productHTML += '<h2>' + product.title + '</h2>';
                    productHTML += '<p><strong>Price:</strong> $' + product.price + '</p>';
                    productHTML += '<p><strong>Description:</strong> ' + product.description + '</p>';
                    productHTML += '</div>';

                    // Append product HTML to the container
                    productListContainer.append(productHTML);
                });
            }
        });