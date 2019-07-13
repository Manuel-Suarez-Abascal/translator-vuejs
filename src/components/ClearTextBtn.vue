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
    }
}
</script>

<style scoped>
.close-icon {
    border:1px solid transparent;
    background-color: transparent;
    display: inline-block;
    vertical-align: middle;
    outline: 0;
    cursor: pointer;
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
	top: 0;
	bottom: 0;
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
