<template>
    <div class="container">


        <h1> Lista de Cursos
        </h1>

        <ul v-if="errors.length > 0">
            <li v-for="error in errors" :key="error.id">
                {{ error }}

            </li>
        </ul>

        <div class="card mb-4">
            <div class="card-body">
                <form action="" @submit.prevent="saveCourse" class="form-control">

                    <div>
                        <label for="title">Titulo</label>
                        <br>
                        <input class="form-control" v-model="course.title" type="text" id="title" placeholder="Ingrese le titulo del curso">

                    </div>

                    <div>
                        <label for="title">Descripción</label>
                        <br>
                        <textarea class="form-control" v-model="course.description" id="description" cols="30" rows="10"
                            placeholder="Ingrese la descripcion del area"></textarea>
                    </div>
                    <div>
                        <label for="title">Categoria</label>
                        <br>
                        <select class="form-control" name="" id="category" v-model="course.category_id">
                            <option value="">Seleccione una opción</option>
                            <option v-for="categorie in categories" :key="'category-' + categorie.id" :value="categorie.id">
                                {{ categorie.name }}</option>
                        </select>
                    </div>

                    <br>

                    <button type="submit" class="btn btn-primary mb-2">Registrar</button>


                </form>
            </div>
        </div>

        <div>

            <h2>Buscador</h2>
            <input v-model="search" type="text" class="form-control mb-4" placeholder="ingrese una palabra para filtrar">

        </div>





        <ul>

            <li v-for="(course) in courses" :key="'course-' + course.id" class="mb-2">

                <router-link :to="{ name: 'CoursesDetails', params: { id: course.id } }">
                    {{ course.title }}

                </router-link>
                -
                <button @click="deleteCourse(course.id)" class="btn btn-danger">Eliminar</button>

            </li>
        </ul>

        <div class="d-flex justify-content-center">
            <nav aria-label="...">
                <ul class="pagination">

                    <li v-for="paginationLink in pagination.links" :key="'paginationLink-' + paginationLink.label"
                        class="page-item" :class="{
                            disabled: paginationLink.url == null,
                            active: paginationLink.active

                        }">
                        <a class="page-link" @click="changePage(paginationLink.url)" v-html="paginationLink.label"
                            style="cursor: pointer;"></a>



                    </li>
                    <!-- <li class="page-item"><a class="page-link" href="#">1</a></li>
                <li class="page-item active" aria-current="page">
                    <a class="page-link" href="#">2</a>
                </li>
                <li class="page-item"><a class="page-link" href="#">3</a></li>
                <li class="page-item">
                    <a class="page-link" href="#">Next</a>
                </li> -->
                </ul>
            </nav>
        </div>
        {{ page }}


    </div>
</template>


<script>



export default {

    data() {
        return {
            courses: [],
            categories: [],
            course: {
                title: '',
                description: '',
                category_id: ''
            },
            search:'',
            errors: [],
            // paginationLinks :[],
            pagination: {}
        }
    },

    created() {
        this.getCourses(),
            this.getCategories()
    },

    computed: {
        page() {
            let page = this.$route.query.page ?? 1;

            if (page > this.pagination.last_page) {

                this.$router.replace({
                    query: {
                        page: this.pagination.last_page
                    }
                })

                return this.pagination.last_page

            }
            return page;
        }

    },

    watch: {

        page() {
            this.getCourses()

        },
        search(){
            this.getCourses()
        }

    },

    methods: {
        getCourses() {
            // this.axios.get('http://127.0.0.1:8000/api/courses?per_page=10' + '&page=' + this.page + '&sort=-id'+'&filter[title]='+this.search)

            this.axios.get('http://127.0.0.1:8000/api/courses',{
                params:{
                    sort: '-id',
                    per_page: 10,
                    page:this.page,
                    'filter[title]': this.search


                }
            })
                .then(response => {
                    let res = response.data;

                    this.courses = res.data
                    this.pagination = {
                        links: res.links,
                        last_page: res.last_page
                    }
                    // this.paginationLinks = res.links
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

        saveCourse() {

            this.axios.post('http://127.0.0.1:8000/api/courses', this.course)
                .then(() => {

                    // let course = response.data;
                    // this.courses.push(course);
                    this.getCourses();


                    this.course = {
                        title: '',
                        description: '',
                        category_id: ''
                    }

                    this.errors = []
                }).catch(error => {

                    let errors = Object.values(error.response.data.errors).flat()

                    this.errors = errors
                })


        },
        deleteCourse(id) {

            this.axios.delete('http://127.0.0.1:8000/api/courses/' + id)
                .then(() => {
                    /*this.courses = this.courses.filter(course => course.id != id)*/

                    this.getCourses();




                })
                .catch(error => {
                    console.log(error);
                })
        },
        changePage(url) {

            this.$router.replace({
                query: {
                    page: url.split('page=')[1]
                }
            })


        }
    },

}
</script>

<style></style>

