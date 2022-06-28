<script setup>
import TheWelcome from "@/components/TheWelcome.vue";
import Navbar from "../components/Navbar.vue";
</script>

<template>
  <main>
    <div id="carouselExampleCaptions" class="carousel slide" data-bs-ride="false">
      <div class="carousel-indicators">
        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
      </div>
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img src="/src/assets/bghome5.png" class="d-block w-100" alt="/src.">
          <div class="carousel-caption d-none d-md-block">
          </div>
        </div>
        <div class="carousel-item">
          <img src="/src/assets/bghome4.png" class="d-block w-100" alt="/src.">
          <div class="carousel-caption d-none d-md-block">
          </div>
        </div>
        <div class="carousel-item">
          <img src="/src/assets/bghome1.png" class="d-block w-100" alt="/src.">
          <div class="carousel-caption d-none d-md-block">
          </div>
        </div>
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  </main>
<br/><br/>
  <H1>EVENT SEKOLAH</H1>
  <div class="row row-cols-1 row-cols-md-3 g-4">
    <div class="col">
      <div class="card h-100">
        <img src="/src/assets/acarabersih-bersih.png" class="card-img-top" alt="/src.">
        <div class="card-body">
          <h5 class="card-title">ACARA BERSIH-BERSIH SEKOLAH</h5>
          <p class="card-text">Adalah kegiatan bersama-sama dalam membersihkan lingkungan sekolah</p>
        </div>
      </div>
    </div>
    <div class="col">
      <div class="card h-100">
        <img src="/src/assets/olahraga.png" class="card-img-top" alt="/src.">
        <div class="card-body">
          <h5 class="card-title">LOMBA OLAHRAGA ANTAR KELAS</h5>
          <p class="card-text">Adalah acara kompetisi dalam seni olahraga antar kelas</p>
        </div>
      </div>
    </div>
    <div class="col">
      <div class="card h-100">
        <img src="/src/assets/pameran.png" class="card-img-top" alt="/src.">
        <div class="card-body">
          <h5 class="card-title">ACARA PAMERAN SEKOLAH</h5>
          <p class="card-text">Adalah acara memamerkan atau memperlihatkan hasil karya seni kepada banyak orang</p>
        </div>
      </div>
    </div>
    <div class="col">
      <div class="card h-100">
        <img src="/src/assets/memperingati.png" class="card-img-top" alt="/src.">
        <div class="card-body">
          <h5 class="card-title">ACARA MEMPERINGATI HARI GURU</h5>
          <p class="card-text">Adalah acara memperingati hari guru yang sangat penting dalam kemajuan pendidikan di Indonesia</p>
        </div>
      </div>
    </div>
  </div>
</template>
