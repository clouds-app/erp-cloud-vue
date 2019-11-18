<template>
	<Dropdown trigger="contextMenu" transfer placement="right-start" :style="{width:'100%'}"@on-click="dropdownClick">
		<div>
			<slot></slot>
		</div>
		<DropdownMenu slot="list">
			<DropdownItem name="menu-insert">插入</DropdownItem>
			<DropdownItem :style="{color:'#ed4014'}" name="menu-delete">删除</DropdownItem>
		</DropdownMenu>
	</Dropdown>
</template>

<script>
	export default {
		name:'rightMenu',
		props:{
			row_index:{
				type:Number
			}
		},
		data(){
			return{
				index:this.row_index
			}
		},
		watch:{
			row_index(n,o){
				this.index = n;
			}
		},
		methods:{
			dropdownClick(name){
				this.$emit(name,this.index);
			}
		}
	}
</script>

<style>
</style>
