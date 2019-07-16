<template>
    <div id="clear-text-btn">
        <button
            class="close-icon"
            @click="clearValue"
        ></button>
    </div>
</template>

<script>
export default {
    export: "ClearTextBtn",
    data(){
        return {

        }
    },
    methods: {
        clearValue() {
            this.$emit("clearText");
        },
    }
}
</script>

<style scoped>
#clear-text-btn {
    float: right;
}
.close-icon {
    border:1px solid transparent;
    background-color: transparent;
    display: inline-block;
    vertical-align: middle;
    outline: 0;
    cursor: pointer;
    position: absolute;
}
.close-icon:after {
	content: "X";
	display: block;
	width: 20px;
	height: 20px;
	position: absolute;
	background-color: rgb(224, 44, 44);
	z-index:1;
	right: 35px;
	bottom: 203px;
	margin-top: 10px;
	padding: 2px;
	border-radius: 50%;
	text-align: center;
	color: white;
	font-weight: normal;
	font-size: 12px;
	box-shadow: 0 0 2px #E50F0F;
	cursor: pointer;
}
</style>
