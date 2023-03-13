<template>
    <div v-if="show" class="modal-shadow" @click.self="closeModal">
        <div class="modal">
            <div class="modal-close" @click="closeModal">&#10006;</div>
            <slot name="title">
                <h3 class="modal-title">Удаление записи</h3>
            </slot>
            <slot name="body">
                <div class="modal-content">
                  <p>Вы точно уверены?</p>
                </div>
            </slot>
            <slot name="footer">
                <div class="modal-footer">
                    <button class="modal-footer__button" @click="deleteData" >
                        Удалить
                    </button>
                </div>
            </slot>
        </div>
    </div>
</template>

<script>
export default {
  name: 'ModalWindow',
  data() {
    return {
      show: false,
      entityName: '',
      id: '',
    };
  },
  methods: {
    deleteData() {
      let id = this.id;
      let name = this.entityName;
      this.$store.dispatch('entities/deleteData', { name, id });
      this.show = false;
    },
    closeModal() {
      this.show = false;
    }
  }
};
</script>

<style scoped
       lang="scss">
    h3 {
      font-family: 'Inter';
    }
    p {
      color: black;
      font-family: 'Inter';
    }
    .modal-shadow {
      position: fixed;
      top: 0;
      left: 0;
      min-height: 100%;
      width: 100%;
      background: rgba(0, 0, 0, 0.39);
    }

    .modal {
      color: black;
      background: #fff;
      border-radius: 8px;
      padding: 15px;
      min-width: 420px;
      max-width: 480px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    .modal-close {
      margin-bottom: 10px;
      cursor:pointer;
    }
    .modal-content{
      margin-top: 10px;
      margin-bottom: 10px;
    }
</style>
