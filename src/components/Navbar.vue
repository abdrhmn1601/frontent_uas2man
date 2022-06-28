<template>
  <nav class="navbar navbar-expand-lg bg-light">
    <div class="container-fluid">
      <img src="/src/assets/logosekolahterbuka.png" class="rounded-circle" alt="my poto" width="50" height="50">
      <h3>Sekolah Terbuka&emsp;&emsp;&emsp;&emsp;</h3>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="/">Beranda</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/Guru">Guru</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/Murid">Siswa</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/Mapel">Matapelajaran</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/Fasilitas">Fasilitas</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/about">Profile</a>
          </li>

        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navbar"
};
</script>

<style scoped>

</style>