<template>
  <section class="hero is-small">
    <div class="hero-body">
      <p class="title">
        Matapelajaran
      </p>
      <p class="subtitle">
        Menampilkan Matapelajaran, Nama Guru, edit dan delete. API endpoint https://uas2man.000webhostapp.com/pages/guru/
      </p>
    </div>
  </section>

  <section class="content">
    <div class="container">
      <button class="button is-link" @click="showAdd">
        <span class="icon is-small">
                    <i class="fas fa-plus"></i>
                  </span>
        <span>Data baru</span>
      </button>
      <table class="table">
        <thead>
        <tr>
          <th>#</th>
          <th>Kode MK</th>
          <th>Nama Matapelajaran</th>
          <th>Kelas</th>
          <th>Jurusan</th>
          <th>Kurikulum</th>
          <th>Nama Guru</th>
          <th>#</th>
        </tr>
        </thead>
        <tbody>
        <tr v-if="data.length" v-for="(value, index) in data">
          <td>{{index + 1}}</td>
          <td>{{value.kode_mata_pelajaran}}</td>
          <td>{{value.nama_matapelajaran}}</td>
          <td>{{value.kelas}}</td>
          <td>{{value.jurusan}}</td>
          <td>{{value.kurikulum}}</td>
          <td>{{value.nip.nama_guru}}</td>
          <td>
            <div class="field has-addons">
              <p class="control">
                <button class="button is-warning" @click="showUpdate(index)">
                  <span class="icon is-small">
                    <i class="fas fa-pencil"></i>
                  </span>
                  <span>Edit</span>
                </button>
              </p>
              <p class="control">
                <button class="button is-danger" @click="showDelete(index)">
                  <span class="icon is-small">
                    <i class="fas fa-trash"></i>
                  </span>
                  <span>Delete</span>
                </button>
              </p>
            </div>
          </td>
        </tr>
        <tr v-else>
          <td colspan="9">
            <div class="notification is-warning">
              Tidak ada data
            </div>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <div class="has-text-centered" v-if="isLoading">
      <i class="fa-solid fa-spinner fa-pulse"></i>
    </div>
  </section>
  <div class="modal" id="modal-delete">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Delete</p>
      </header>
      <section class="modal-card-body">
        <div v-if="selectedIndex > -1">
          <ul>
            <li>Kode MK <strong>{{data[selectedIndex].kode_mata_pelajaran}}</strong></li>
            <li>Nama Matapelajaran <strong>{{data[selectedIndex].nama_matapelajaran}}</strong></li>
            <li>NIP <strong>{{data[selectedIndex].guru.nip}}</strong></li>
          </ul>
        </div>
      </section>
      <footer class="modal-card-foot">
        <button class="button is-danger" @click="remove">Delete</button>
        <button class="button" @click="closeModal('modal-delete')">Close</button>
      </footer>
    </div>
  </div>
  <div class="modal" id="modal-update">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Update</p>
      </header>
      <section class="modal-card-body">
        <div v-if="selectedIndex > -1">
          <form @submit.prevent="update">
            <div class="field">
              <label class="label" for="nama_matapelajaran_update">Nama Matapelajaran</label>
              <div class="control">
                <input class="input" type="text" id="nama_matapelajaran_update" placeholder="nama_matapelajaran" required v-model="formEdit.nama_matapelajaran">
              </div>
            </div>
            <div class="field">
              <label class="label" for="kelas_update">Kelas</label>
              <div class="control">
                <input class="input" type="text" id="kelas_update" placeholder="kelas" required v-model="formEdit.kelas">
              </div>
            </div>
            <div class="field">
              <label class="label" for="jurusan_update">Jurusan</label>
              <div class="control">
                <input class="input" type="text" id="jurusan_update" placeholder="Jurusan" required v-model="formEdit.jurusan">
              </div>
            </div>
            <div class="field">
              <label class="label" for="kurikulum_update">Kurikulum</label>
              <div class="control">
                <input class="input" type="text" id="kurikulum_update" placeholder="Kurikulum" required v-model="formEdit.kurikulum">
              </div>
            </div>
            <div class="field">
              <label class="label" for="nip_update">NIP</label>
              <div class="control">
                <div class="select is-primary">
                  <select name="nip_update" id="nip_update" v-model="formEdit.nip">
                    <option v-for="val in guru" :value="val.nip">{{val.nip}}</option>
                  </select>
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>
      <footer class="modal-card-foot">
        <button class="button is-success" @click="update">Update</button>
        <button class="button" @click="closeModal('modal-update')">Close</button>
      </footer>
    </div>
  </div>
  <div class="modal" id="modal-add">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Add new</p>
      </header>
      <section class="modal-card-body">
        <form @submit.prevent="addNew">
          <div class="field">
            <label class="label" for="kode_mata_pelajaran_insert">Kode MK</label>
            <div class="control">
              <input class="input" type="text" id="kode_mata_pelajaran_insert" placeholder="Kode MK" required v-model="formAdd.kode_mata_pelajaran">
            </div>
          </div>
          <div class="field">
            <label class="label" for="nama_matapelajaran_insert">Nama Matapelajaran</label>
            <div class="control">
              <input class="input" type="text" id="nama_matapelajaran_insert" placeholder="Nama Matapelajaran" required v-model="formAdd.nama_matapelajaran">
            </div>
          </div>
          <div class="field">
            <label class="label" for="kelas_insert">Kelas</label>
            <div class="control">
              <input class="input" type="text" id="kelas_insert" placeholder="Kelas" required v-model="formAdd.kelas">
            </div>
          </div>
          <div class="field">
            <label class="label" for="jurusan_insert">Jurusan</label>
            <div class="control">
              <input class="input" type="text" id="jurusan_insert" placeholder="Jurusan" required v-model="formAdd.jurusan">
            </div>
          </div>
          <div class="field">
            <label class="label" for="kurikulum_insert">Kurikulum</label>
            <div class="control">
              <input class="input" type="text" id="kurikulum_insert" placeholder="Kurikulum" required v-model="formAdd.kurikulum">
            </div>
          </div>
          <div class="field">
            <label class="label" for="nip_insert">NIP</label>
            <div class="control">
              <div class="select is-primary">
                <select name="nip_insert" id="nip_insert" v-model="formAdd.nip">
                  <option value="0" disabled>---NIP---</option>
                  <option v-for="val in guru" :value="val.nip">{{val.nip}}</option>
                </select>
              </div>
            </div>
          </div>
        </form>
      </section>
      <footer class="modal-card-foot">
        <button class="button is-success" @click="addNew">Save</button>
        <button class="button" @click="closeModal('modal-add')">Close</button>
      </footer>
    </div>
  </div>
</template>

<script>
import {nextTick} from "vue";
export default {
  name: "Matapelajaran",
  data(){
    return{
      data: [],
      guru: [],
      selectedIndex: -1,
      isLoading: false,
      formAdd: {
        kode_mata_pelajaran: '',
        nama_matapelajaran: '',
        kelas: '',
        jurusan: '',
        kurikulum: '',
        nip: ''
      },
      formEdit: {
        kode_mata_pelajaran: '',
        nama_matapelajaran: '',
        kelas: '',
        jurusan: '',
        kurikulum: '',
        nip: ''
      }
    }
  },
  methods:{
    load(){
      this.isLoading = true;
      //const baseurl = import.meta.env.VITE_URL_ENDPOINT_2;
      fetch(`https://uas2man.000webhostapp.com/pages/mata_pelajaran/index.php`,{
        method: 'GET',
      })
        .then(response => {
          if(response.ok){
            return response.json();
          }
        })
        .then(json => {
          this.data = json.data;
        })
        .catch(()=>{
          alert('Terjadi error')
        })
        .finally(()=>{
          this.isLoading = false;
        })
    },
    loadGuru(){
      this.isLoading = true;
      const baseurl = import.meta.env.VITE_URL_ENDPOINT_2;
      fetch(`https://uas2man.000webhostapp.com/pages/guru/index.php`,{
        method: 'GET',
      })
        .then(response => {
          if(response.ok){
            return response.json();
          }
        })
        .then(json => {
          this.guru = json.data;
        })
        .catch(()=>{
          alert('Terjadi error')
        })
        .finally(()=>{
          this.isLoading = false;
        })
    },
    remove(){
      this.closeModal('modal-delete');
      if(this.selectedIndex >= 0){
        const baseurl = import.meta.env.VITE_URL_ENDPOINT_2;
        const selectedData = this.data[this.selectedIndex];
        const payload = new URLSearchParams({
          'nip': selectedData.nip
        });
        fetch(`https://uas2man.000webhostapp.com/pages/mata_pelajaran/delete.php`,{
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'API-Key': 'secret'
          },
          body: payload.toString(),
        })
          .then(response => {
            if(response.ok){
              this.data.splice(this.selectedIndex, 1);
            }
            return response.json();
          })
          .then(json =>{
            if(!json.status){
              alert(json.error);
            }
          })
          .catch(()=>{
            alert('Terjadi error')
          })
      }
      this.selectedIndex = -1;
    },
    update(){
      this.closeModal('modal-update');
      if(this.selectedIndex >= 0){
        const baseurl = import.meta.env.VITE_URL_ENDPOINT_2;
        const payload = new URLSearchParams({
          nama_matapelajaran: this.formEdit.nama_matapelajaran,
          kelas: this.formEdit.kelas,
          jurusan: this.formEdit.jurusan,
          kurikulum: this.formEdit.kurikulum,
          nip: this.formEdit.nip,
          kode_mata_pelajaran: this.formEdit.kode_mata_pelajaran,
        });
        fetch(`https://uas2man.000webhostapp.com/pages/mata_pelajaran/update.php`,{
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'API-Key': 'secret'
          },
          body: payload.toString(),
        })
          .then(response => {
            return response.json()
          })
          .then(json =>{
            if(!json.status){
              alert(json.error);
            }else{
              /*
              Update data pada kolom yg diupdate
               */
              this.data[this.selectedIndex] = json.data;
            }
          })
          .catch( (e) =>{
            alert('Terjadi error'+e.toString())
          })
          .finally(()=>{
            this.selectedIndex = -1;
          })
      }
    },
    showDelete(index){
      this.showModal('modal-delete');
      this.selectedIndex = index;
    },
    showUpdate(index){
      this.showModal('modal-update');
      this.selectedIndex = index;
      const selectedData = this.data[index];
      this.formEdit = {
        kode_mata_pelajaran: selectedData.kode_mata_pelajaran,
        nama_matapelajaran: selectedData.nama_matapelajaran,
        kelas: selectedData.kelas,
        jurusan: selectedData.jurusan,
        kurikulum: selectedData.kurikulum,
        nip: selectedData.nip,
      }
      nextTick(()=>{
        document.getElementById('nama_matapelajaran_update').focus();
      })
    },
    showAdd(){
      this.resetFormAdd();
      this.showModal('modal-add');
      nextTick(()=>{
        document.getElementById('kode_mata_pelajaran_insert').focus();
      })
    },
    addNew(){
      this.closeModal('modal-add');
      const baseurl = import.meta.env.VITE_URL_ENDPOINT_2;
      const payload = new URLSearchParams({
        nama_matapelajaran: this.formAdd.nama_matapelajaran,
        kelas: this.formAdd.kelas,
        jurusan: this.formAdd.jurusan,
        kurikulum: this.formAdd.kurikulum,
        nip: this.formAdd.guru.nip,
        kode_mata_pelajaran: this.formAdd.kode_mata_pelajaran,
      });
      fetch(`https://uas2man.000webhostapp.com/pages/mata_pelajaran/create.php`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: payload.toString(),
      })
        .then(response => {
          return response.json()
        })
        .then(json =>{
          if(!json.status){
            alert(json.error);
          }else{
            this.data.push(json.data);
          }
        })
        .catch( (e) =>{
          alert('Terjadi error'+e.toString())
        })
        .finally(()=>{
          this.formAdd.nama = '';
        })
    },
    showModal(id){
      document.getElementById(id).classList.add('is-active');
    },
    closeModal(id){
      document.getElementById(id).classList.remove('is-active');
    },
    resetFormAdd(){
      this.formAdd = {
        kode_mata_pelajaran: '',
        nama_matapelajaran: '',
        kelas: '',
        jurusan: '',
        kurikulum: '',
        nip: ''
      }
    }
  },
  mounted() {
    this.load();
    this.loadGuru();
  }
}
</script>

<style scoped>
</style>