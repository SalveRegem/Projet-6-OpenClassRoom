async function getApiAndDisplay(categoryId) {
    try {
        const reponseJSON = await fetch("http://localhost:5678/api/works");
        const reponseJS = await reponseJSON.json();

        const galleryDiv = document.querySelector(".gallery");
        galleryDiv.innerHTML = '';

        reponseJS.forEach(img => {
            if (categoryId === 0 || img.categoryId === categoryId) {
                galleryDiv.innerHTML += `
                    <figure class="gallery-item" data-id="${img.id}">
                        <img src="${img.imageUrl}" alt="${img.title}">
                        <figcaption>${img.title}</figcaption>
                    </figure>
                `;
            }
            const content = 
          `<figure data-id="${img.id}">
              <img src="${img.imageUrl}" alt="${img.title}">
              <button class="btn-del-icon" data-id="${img.id}">
                  <img src="assets/icons/bin-icon.svg" alt="Icône d'une corbeille">
              </button>
          </figure>`;
          document.querySelector('.gallery-modal').insertAdjacentHTML('beforeend', content);
        });
        
        
      
  
    } catch (error) {
        console.log("Erreur :", error);
    }
  }
  
  async function getByCategories() {
    try {
        const reponseJSON = await fetch("http://localhost:5678/api/categories");
        const reponseJS = await reponseJSON.json();
        const btnList = document.querySelector('.btn-list');
        
  
        const allButton = document.createElement('button');
        allButton.classList.add('btn', 'btn-active');
        allButton.innerText = 'Tous';
        allButton.setAttribute('data-category', '0');
        btnList.appendChild(allButton);
  
        reponseJS.forEach(category => {
            const button = document.createElement('button');
            button.classList.add('btn');
            button.innerText = category.name;
            button.setAttribute('data-category', category.id);
            document.querySelector('.categories-addwork').insertAdjacentHTML('beforeend', `<option value="${category.id}">${category.name}</option>`);
  
            button.addEventListener('click', () => {
                btnList.querySelectorAll('.btn').forEach(btn => btn.classList.remove('btn-active'));
                button.classList.add('btn-active');
                allButton.classList.remove('btn-active');
                getApiAndDisplay(parseInt(button.getAttribute('data-category')));
            });
  
            btnList.appendChild(button);
        });
  
        allButton.addEventListener('click', () => {
            btnList.querySelectorAll('.btn').forEach(btn => btn.classList.remove('btn-active'));
            allButton.classList.add('btn-active');
            getApiAndDisplay(0);
        });
        
        getApiAndDisplay(0);
  
    } catch (error) {
        console.log("Erreur :", error);
    }
  }
  
  getByCategories();
  
  
  if(window.localStorage.getItem('token') !== null) {
      document.querySelector('.mode_edition').style.display = 'flex';
  
      const loginBtn = document.querySelector('.login_selector');
      loginBtn.innerHTML = "logout";
      loginBtn.href = '#';
      
      loginBtn.addEventListener('click', (event) => {
          event.preventDefault();
          window.localStorage.removeItem('token');
          window.location = "index.html";
      })
  
      document.querySelector('.filter').style.display = 'none';
  
      document.querySelector('.mode_edition').style.display = 'flex';
  
      document.querySelector('.modal-title').innerHTML = 'Galerie photo';
      
      const portfolioTitle = document.querySelector(".portfolio-title");
      portfolioTitle.style.margin = '3em 0 3em 0' ;
  
  
      const editBtn = document.querySelectorAll('.edit-btn');
      editBtn.forEach(btn => {
          btn.style.display = 'inline-flex';
      })
      editBtn.forEach(btn => {
          btn.addEventListener('click', (event) => {
              event.preventDefault();
              document.querySelector('.modal-container').style.display = 'flex';
          })
      })
      document.querySelector('.close-btn').addEventListener('click', (event) => {
          event.preventDefault();
          document.querySelector('.modal-container').style.display = 'none';
      })
      document.querySelector(".modal-container").addEventListener("click",(event)=>{
        event.preventDefault();
        document.querySelector(".modal-container").style.display ="none";
        })
        document.querySelector(".modal").addEventListener("click", (event) => {
          event.stopPropagation();
      });
  
      document.querySelector('.add-btn').addEventListener('click', (e) => {
          e.preventDefault();
          // Show back arrow
          document.querySelector('.return-btn').style.visibility = 'visible';
  
          // Update the title of the modal
          document.querySelector('.modal-title').innerHTML = 'Ajout photo';
  
          // Hide the gallery in the modal
          document.querySelector('.gallery-modal').style.display = 'none';
  
          //hide the picture add button
          document.querySelector('.add-btn').style.display = 'none'
  
          //hide the modal-line 
          document.querySelector('.modal-line').style.display = 'none'
  
          // Show the add work form in the modal
          document.querySelector('.addwork-modal').style.display = 'block';
  
          // Hide the upload work img
          document.querySelector('.work-imgUpload').style.display = 'none';
  
          // Show the upload work form
          document.querySelector('.work-upload-form').style.display = 'flex';
  
          // Change background submit input to grey
          document.querySelector('.submit-btn').style.backgroundColor = 'rgb(167, 167, 167)';
  
          // Reset the title input
          document.querySelector('.title-addwork').value = '';
  
          // Reset image input element
          document.querySelector('.img-addwork').value = '';
  
          // Reset the select element
          document.querySelector('.categories-addwork').selectedIndex = 0;
      })
  
      // Show modal gallery
      document.querySelector('.return-btn').addEventListener('click', (e) => {
          e.preventDefault();
          backFirstModal();
      })

      function backFirstModal() {
        document.querySelector('.return-btn').style.visibility = 'hidden';
        document.querySelector('.modal-title').innerHTML = 'Galerie photo';
        document.querySelector('.addwork-modal').style.display = 'none';
        document.querySelector('.gallery-modal').style.display = 'grid';
        document.querySelector('.close-modal').style.display = 'flex';
        document.querySelector('.modal-line').style.display = 'flex'
        document.querySelector('.add-btn').style.display = 'flex'
    }
     
      const uploadWorkForm = document.querySelector('.work-upload-form');
      uploadWorkForm.addEventListener('change', (e) => {
          
          uploadWorkForm.style.display = 'none';
  
          const uploadWorkImg = document.querySelector('.work-imgUpload');
          
          uploadWorkImg.style.display = 'flex';
  
         
         uploadWorkImg.innerHTML = '';
  
         
          uploadWorkImg.insertAdjacentHTML('beforeend', 
              `<img src="${URL.createObjectURL(e.target.files[0])}" 
              alt="${e.target.files[0].name}" 
              class="current-img-upload">`
          );
          
      })
  
      async function addWork() {
        try {
          const picture = document.querySelector(".img-addwork").files[0];
          const title = document.querySelector(".title-addwork");
          const category = document.querySelector(".categories-addwork");
      
          if (picture.name <= 0 || !["image/jpeg", "image/png", "image/jpg"].includes(picture.type)) {
            return alert("L'image n'est pas sélectionnée ou son format est incorrect.");
          }
          if (title.value.length <= 0) {
            return alert("Veuillez entrer un titre.");
          }
          if (category.value.length <= 0) {
            return alert("Veuillez sélectionner une catégorie.");
          }
      
          const formData = new FormData(document.getElementById("addwork-form"));
      
          const response = await fetch("http://localhost:5678/api/works", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: formData,
          });
          if (response.ok) {
            const responseData = await response.json();
            const galleryModal = document.querySelector('.gallery-modal');
            galleryModal.insertAdjacentHTML('beforeend', `
                <figure data-id="${responseData.id}">
                    <img src="${responseData.imageUrl}" alt="${title.value}">
                    <button class="btn-del-icon" data-id="${responseData.id}">
                        <img src="assets/icons/bin-icon.svg" alt="Icône d'une corbeille">
                    </button>
                </figure>
            `);
            const gallery = document.querySelector('.gallery');
      
            // Créez un nouvel élément de travail (addwork) pour la galerie
            const newWork = document.createElement('div');
            newWork.className = 'gallery-item';
            newWork.setAttribute('data-id', responseData.id);
      
            // Personnalisez le contenu du nouvel élément de travail
            newWork.innerHTML = `
                <img src="${responseData.imageUrl}" alt="${title.value}">
                <h3>${title.value}</h3>
            `;
    
            title.value = "";
            document.querySelector(".img-addwork").value = "";
            document.querySelector(".categories-addwork").selectedIndex = 0;
          }
        } catch (error) {
          console.log("erreur", error)
        }
      }
      
    
    
    document.getElementById('addwork-form').addEventListener('input', () => {
     document.querySelector('.submit-btn').style.backgroundColor = document.querySelector('.title-addwork').value.length > 0 && document.querySelector('.img-addwork').value.length > 0 ? '' : 'rgb(167, 167, 167)';
    });

    
   
    document.getElementById('addwork-form').addEventListener('submit', (e) => {
        e.preventDefault();
        addWork();
        backFirstModal();
    })
    
}




async function deleteImageById(id) {
    try {
        const response = await fetch(`http://localhost:5678/api/works/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });

        return response.ok;
    } catch (error) {
        console.log('Error while deleting image', error);
        return false;
    }
}

// Gestionnaire d'événement click pour les boutons de suppression
document.querySelector('.gallery-modal').addEventListener('click', async (event) => {
    const deleteButton = event.target.closest('.btn-del-icon');
    if (deleteButton) {
        const id = deleteButton.getAttribute('data-id');
        try {
            const success = await deleteImageById(id);

            if (success) {
                // Supprimez l'élément correspondant de la .gallery-modal
                const galleryModalItem = deleteButton.closest('figure[data-id]');
                if (galleryModalItem) {
                    galleryModalItem.remove(); // Supprimez visuellement l'élément de la galerie modale
                }
                // Supprimez l'élément correspondant de la .gallery
                const galleryItem = document.querySelector(`.gallery-item[data-id="${id}"]`);
                if (galleryItem) {
                    galleryItem.remove(); // Supprimez visuellement l'élément de la galerie principale
                }
            } else {
                console.error('Failed to delete image');
            }
        } catch (error) {
            console.error('Error while deleting image:', error);
        }
    }
});



