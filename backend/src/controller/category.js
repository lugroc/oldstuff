const Category = require('../models/category');
const slugify = require('slugify');
const shortid = require('shortid');


function createCategory(categories, parentId = null){
    const categoryList = [];
    let category;
    if (parentId == null) {
        category = categories.filter((cat) => cat.parentId == undefined);
    } else {
        category = categories.filter((cat) => cat.parentId == parentId);
    }

    for (let i of category) {categoryList.push({
        _id: i._id,
        name: i.name,
        slug: i.slug,
        parentId: i.parentId,
        type: i.type,
        children: createCategory(categories, i._id),
        });
    }
    return categoryList;
};

exports.addCategory = (req,res) =>{
    const Object = {
        name: req.body.name,
        slug: slugify(req.body.name),
        createdBy: req.user._id
    }

    if(req.file){
        Object.categoryImage = req.file.filename;
    }

    if(req.body.parentId){
        Object.parentId = req.body.parentId;
    }

    const cat = new Category(Object);
    cat.save((error, category) =>{
        if(error) return res.status(400).json({error});
        if(category){
            return res.status(201).json({category});
        }
    });
};

exports.getCategory = (req, res) => {
    Category.find({})
    .exec((error, categories) => {
        if (error) return res.status(400).json({ error });
        if (categories) {
            const List = createCategories(categories);
            res.status(200).json({ List });
        }
    });;
};

exports.updateCategory = async (req, res) => {
    const { _id, name, parentId, type } = req.body;
    const updatedCategories = [];
    if (name instanceof Array) {
        for (let i = 0; i < name.length; i++) {
        const category = {
            name: name[i],
            type: type[i],
        };
        if (parentId[i] !== "") {
            category.parentId = parentId[i];
        }

        const updatedCategory = await Category.findOneAndUpdate(
            { _id: _id[i] },
            category,
            { new: true }
        );
        updatedCategories.push(updatedCategory);
        }
        return res.status(201).json({ updateCategories: updatedCategories });
    } else {
        const category = {
        name,
        type,
        };
        if (parentId !== "") {
        category.parentId = parentId;
        }
        const updatedCategory = await Category.findOneAndUpdate({ _id }, category, {
        new: true,
        });
        return res.status(201).json({ updatedCategory });
    }
};
    
exports.deleteCategory = async (req, res) => {
    const { ids } = req.body.payload;
    const deletedCategories = [];
    for (let i = 0; i < ids.length; i++) {
        const deleteCategory = await Category.findOneAndDelete({
        _id: ids[i]._id,
        createdBy: req.user._id,
        });
        deletedCategories.push(deleteCategory);
    }

    if (deletedCategories.length == ids.length) {
        res.status(201).json({ message: "Categories removed" });
    } else {
        res.status(400).json({ message: "Something went wrong" });
    }
};
  
