function getBlogIdToDelete(blogId) {
    console.log(blogId);
    document.getElementById("blogIdToDelete").value = blogId
}


function getBlogId(blogId) {

    console.log(blogId);
    setOldData(blogId);
}


function setOldData(blogId) {
    let oldTitle = document.getElementById(`title${blogId}`).innerText
    let oldContent = document.getElementById(`content${blogId}`).innerText
    console.log(oldTitle, oldContent)
    document.getElementById("blogIdToEdit").value = blogId
    document.getElementById("oldtitle").value = oldTitle;
    document.getElementById("oldcontent").value = oldContent;
}
