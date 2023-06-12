<template>
    <div>
        <form action="" @submit.prevent="updateCourse">

            <div>
                <label for="title">Titulo</label>
                <br>
                <input v-model="course.title" type="text" id="title" placeholder="Ingrese le titulo del curso">

            </div>

            <div>
                <label for="title">Descripción</label>
                <br>
                <textarea v-model="course.description" id="description" cols="30" rows="10"
                    placeholder="Ingrese la descripcion del area"></textarea>
            </div>
            <div>
                <label for="title">Categoria</label>
                <br>
                <select name="" id="category" v-model="course.category_id">
                    <option value="">Seleccione una opción</option>
                    <option v-for="categorie in categories" :key="'category-' + categorie.id" :value="categorie.id">
                        {{ categorie.name }}</option>
                </select>
            </div>

            <br>

            <button type="submit">Registrar</button>


        </form>
    </div>
</template>
<script>


export default {
    data() {

        return {

            course: {},
            detalleCursoCategory: {},
            categories: [],
            errors:[]

        }

    },
    created() {

        this.getCourse()
        this.getCategories()

    },

    methods: {
        getCourse() {

            this.axios.get('http://127.0.0.1:8000/api/courses/' + this.$route.params.id + '?included=category')
                .then(response => {
                    this.course = response.data
                    this.detalleCursoCategory = this.course.category

                })
                .catch(error => {
                    console.log(error)
                })

        },

        updateCourse() {

            this.axios.put('http://127.0.0.1:8000/api/courses/'+this.$route.params.id ,this.course)
            .then(() => {
                    this.$router.push({name:'CoursesDetails', params:{id:this.$route.params.id}})
                })
                .catch(error => {
                    console.log(error)
                })
        },
        getCategories() {
            this.axios.get('http://127.0.0.1:8000/api/categories')
                .then(response => {
                    this.categories = response.data
                })
                .catch(error => {
                    console.log(error)
                })
        },
    },
}
</script>