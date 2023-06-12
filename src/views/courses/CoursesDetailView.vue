<template>
    <div>
        <h1> {{ course.title }}</h1>

        <p>{{ course.description }}</p>
        <p>

            <b> Categoria: {{ detalleCursoCategory.name }}
            </b>


        </p>


        <router-link :to="{name:'CoursesEdit', params: {id: course.id}}" >
            Editar Curso
        
        </router-link>
    </div>
</template>


<script>

export default {

    data() {

        return {

            course: {},
            detalleCursoCategory: {}

        }

    },

    created() {

        this.getCourse()

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

        }
    },


}
</script>